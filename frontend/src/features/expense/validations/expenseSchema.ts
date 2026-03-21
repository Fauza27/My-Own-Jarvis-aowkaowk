import z from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  type: z.enum(["income", "expense"], "Type must be either 'income' or 'expense'"),
  description: z.string().max(255, "Description must be at most 255 characters").optional(),
  category: z.string().max(100, "Category must be at most 100 characters").optional(),
  subCategory: z.string().max(100, "Subcategory must be at most 100 characters").optional(),
  paymentMethod: z.string().max(100, "Payment method must be at most 100 characters").optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
