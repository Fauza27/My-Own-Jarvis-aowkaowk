# CREATE TABLE IF NOT EXISTS expenses (
#     id               UUID           DEFAULT gen_random_uuid() PRIMARY KEY,
#     user_id          UUID           REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
#     amount           NUMERIC(15, 2) NOT NULL,
#     type             VARCHAR(10)    NOT NULL CHECK (type IN ('income', 'expense')),
#     description      TEXT,
#     category         VARCHAR(50)    NOT NULL,
#     subcategory      VARCHAR(50),
#     payment_method   VARCHAR(50),
#     transaction_date DATE           DEFAULT CURRENT_DATE,
#     created_at       TIMESTAMPTZ    DEFAULT NOW() NOT NULL,
#     updated_at       TIMESTAMPTZ    DEFAULT NOW() NOT NULL,
#     deleted_at       TIMESTAMPTZ    DEFAULT NULL
# );

from calendar import monthrange
from supabase import Client
from postgrest.exceptions import APIError

from app.core.exceptions import NotFoundError


class ExpenseRepository:
    """
    Managing all data access for table 'expenses'.
    Write operations use TABLE directly.
    Read operations use VIEW (active_expenses) to automatically filter soft-deleted records.
    """

    TABLE = "expenses"
    VIEW = "active_expenses"  # filters deleted_at IS NULL

    def __init__(self, client: Client):
        self._client = client

    # =========================================================================
    # READ
    # =========================================================================

    def find_all(
        self,
        user_id: str,
        limit: int = 100,
        offset: int = 0,
    ) -> list[dict]:
        """
        Find all active expenses for a user with pagination.

        Args:
            user_id: The authenticated user's ID.
            limit:   Maximum number of records to return (default 100).
            offset:  Number of records to skip (default 0).

        Returns:
            List of expense dicts ordered by created_at descending.
        """
        response = (
            self._client
            .table(self.VIEW)  # soft-delete filtered
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(limit)
            .offset(offset)
            .execute()
        )
        return response.data

    def find_by_id(self, expense_id: str, user_id: str) -> dict:
        """
        Find a single active expense by its ID and owner.

        Args:
            expense_id: UUID of the expense.
            user_id:    The authenticated user's ID.

        Returns:
            Expense dict.

        Raises:
            NotFoundError: If the expense does not exist or belongs to another user.
        """
        try:
            response = (
                self._client
                .table(self.VIEW)  # soft-delete filtered
                .select("*")
                .eq("id", expense_id)
                .eq("user_id", user_id)
                .maybe_single()
                .execute()
            )
            if not response.data:
                raise NotFoundError(f"Expense with id '{expense_id}' not found")
            return response.data
        except NotFoundError:
            raise
        except APIError as e:
            # Only catch DB/network errors — not swallow everything
            raise NotFoundError(f"Expense with id '{expense_id}' not found") from e

    # =========================================================================
    # WRITE
    # =========================================================================

    def create(self, expense_data: dict) -> dict:
        """
        Insert a new expense record.

        Args:
            expense_data: Dict of column values to insert.

        Returns:
            The created expense dict returned by the DB.

        Raises:
            RuntimeError: If the DB returns no data after insert.
        """
        response = (
            self._client
            .table(self.TABLE)
            .insert(expense_data)
            .execute()
        )
        if not response.data:
            raise RuntimeError("Failed to create expense")
        return response.data[0]

    def update(self, expense_id: str, user_id: str, update_data: dict) -> dict:
        """
        Update an expense by its ID and owner.

        Args:
            expense_id:  UUID of the expense.
            user_id:     The authenticated user's ID.
            update_data: Dict of fields to update.

        Returns:
            The updated expense dict returned by the DB.

        Raises:
            NotFoundError: If no matching record was updated.
        """
        response = (
            self._client
            .table(self.TABLE)
            .update(update_data)
            .eq("id", expense_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not response.data:
            raise NotFoundError(f"Expense with id '{expense_id}' not found")
        return response.data[0]

    def delete(self, expense_id: str, user_id: str) -> None:
        """
        Soft-delete an expense by its ID and owner.

        Calls the DB function soft_delete_expense which sets deleted_at = NOW().
        Existence is verified AFTER the RPC call to avoid a race condition.

        Args:
            expense_id: UUID of the expense.
            user_id:    The authenticated user's ID.

        Raises:
            NotFoundError: If the expense does not exist or is already deleted.
        """
        # Verify existence first — raises NotFoundError if not found
        self.find_by_id(expense_id, user_id)

        # Perform soft delete via DB function (handles auth check internally)
        self._client.rpc(
            "soft_delete_expense",
            {"expense_id": expense_id}
        ).execute()

        # Confirm it is now soft-deleted (catches race conditions)
        try:
            self.find_by_id(expense_id, user_id)
            # If still found in VIEW, soft delete did not apply
            raise RuntimeError(f"Soft delete failed for expense '{expense_id}'")
        except NotFoundError:
            # Expected — record is no longer visible in active_expenses view
            return

    # =========================================================================
    # SUMMARY
    # =========================================================================
    def get_summary_all_time(self, user_id: str) -> dict:
        """Get all-time income/expense summary for a user."""
        response = (
            self._client
            .table(self.VIEW)
            .select("amount, type")
            .eq("user_id", user_id)
            .execute()
        )
        income  = float(sum(e["amount"] for e in response.data if e["type"] == "income"))
        expense = float(sum(e["amount"] for e in response.data if e["type"] == "expense"))
        return {
            "total_income":  income,
            "total_expense": expense,
            "net_balance":   income - expense,
        }

    def get_summary_by_date(self, user_id: str, transaction_date: str) -> dict:
        """
        Get income/expense summary for a user on a specific date.

        Args:
            user_id:          The authenticated user's ID.
            transaction_date: Date string in YYYY-MM-DD format.

        Returns:
            Dict with keys: total_income, total_expense, net_balance.
        """
        response = (
            self._client
            .table(self.VIEW)
            .select("amount, type")
            .eq("user_id", user_id)
            .eq("transaction_date", transaction_date)
            .execute()
        )
        # Cast to float — DB returns NUMERIC as Decimal which breaks JSON serialization
        income  = float(sum(e["amount"] for e in response.data if e["type"] == "income"))
        expense = float(sum(e["amount"] for e in response.data if e["type"] == "expense"))
        return {
            "total_income":  income,
            "total_expense": expense,
            "net_balance":   income - expense,
        }

    def get_summary_by_month(self, user_id: str, month: int, year: int) -> dict:
        """
        Get income/expense summary for a user in a specific month and year.

        Args:
            user_id: The authenticated user's ID.
            month:   Month as integer (1–12).
            year:    Year as integer (e.g. 2024).

        Returns:
            Dict with keys: total_income, total_expense, net_balance.
        """
        last_day   = monthrange(year, month)[1]
        start_date = f"{year}-{month:02d}-01"
        end_date   = f"{year}-{month:02d}-{last_day}"

        response = (
            self._client
            .table(self.VIEW)
            .select("amount, type")
            .eq("user_id", user_id)
            .gte("transaction_date", start_date)
            .lte("transaction_date", end_date)
            .execute()
        )
        # Cast to float — DB returns NUMERIC as Decimal which breaks JSON serialization
        income  = float(sum(e["amount"] for e in response.data if e["type"] == "income"))
        expense = float(sum(e["amount"] for e in response.data if e["type"] == "expense"))
        return {
            "total_income":  income,
            "total_expense": expense,
            "net_balance":   income - expense,
        }

    def get_summary_by_year(self, user_id: str, year: int) -> dict:
        """
        Get income/expense summary for a user in a specific year.

        Args:
            user_id: The authenticated user's ID.
            year:    Year as integer (e.g. 2024).

        Returns:
            Dict with keys: total_income, total_expense, net_balance.
        """
        start_date = f"{year}-01-01"
        end_date   = f"{year}-12-31"

        response = (
            self._client
            .table(self.VIEW)
            .select("amount, type")
            .eq("user_id", user_id)
            .gte("transaction_date", start_date)
            .lte("transaction_date", end_date)
            .execute()
        )
        # Cast to float — DB returns NUMERIC as Decimal which breaks JSON serialization
        income  = float(sum(e["amount"] for e in response.data if e["type"] == "income"))
        expense = float(sum(e["amount"] for e in response.data if e["type"] == "expense"))
        return {
            "total_income":  income,
            "total_expense": expense,
            "net_balance":   income - expense,
        }