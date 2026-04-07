"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { CreateExpenseInput } from "../types";
import { createExpenseSchema } from "../validations/expenseSchema";
import { useCreateExpense } from "../hooks";

type ExpenseFormProps = {
  onSuccess?: () => void;
  /** When true, renders without the card wrapper/heading (for use inside modals) */
  compact?: boolean;
};

export function ExpenseForm({ onSuccess, compact = false }: ExpenseFormProps) {
  const createExpenseMutation = useCreateExpense();

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const parseDigitsToNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateExpenseInput>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0,
      type: "expense",
      category: "",
      description: "",
      subcategory: "",
      payment_method: "",
      transaction_date: "",
    },
  });

  const watchedAmount = useWatch({ control, name: "amount" });
  const normalizedAmount = useMemo(() => {
    const parsed = Number(watchedAmount);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [watchedAmount]);

  // Form ini sengaja sederhana untuk MVP.
  // Fokus utamanya adalah memastikan alur create expense end-to-end sudah stabil.
  const onSubmit = async (values: CreateExpenseInput) => {
    const payload: CreateExpenseInput = {
      ...values,
      // Jika user mengosongkan field opsional, kirim undefined agar payload tetap bersih.
      description: values.description || undefined,
      subcategory: values.subcategory || undefined,
      payment_method: values.payment_method || undefined,
      transaction_date: values.transaction_date || undefined,
    };

    await createExpenseMutation.mutateAsync(payload);

    reset({
      amount: 0,
      type: "expense",
      category: "",
      description: "",
      subcategory: "",
      payment_method: "",
      transaction_date: "",
    });

    onSuccess?.();
  };

  const isLoading = isSubmitting || createExpenseMutation.isPending;

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className={compact ? "" : "bg-card rounded-2xl border border-border p-6"}>
      {!compact && <h2 className="text-base font-semibold text-card-foreground mb-4">Tambah Transaksi</h2>}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Jumlah</label>
          <div className="flex rounded-lg border border-input focus-within:ring-2 focus-within:ring-ring overflow-hidden">
            <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border-r border-input">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatRupiah(normalizedAmount)}
              onChange={(event) => {
                const numericValue = parseDigitsToNumber(event.target.value);
                setValue("amount", numericValue, { shouldValidate: true, shouldDirty: true });
              }}
              placeholder="0"
              className="w-full px-3 py-2 text-sm bg-background text-foreground focus:outline-none"
            />
          </div>
          {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Tipe</label>
          <select {...register("type")} className={inputClass}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {errors.type && <p className="text-xs text-destructive mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Kategori</label>
          <input type="text" placeholder="contoh: food" {...register("category")} className={inputClass} />
          {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Subkategori</label>
          <input type="text" placeholder="opsional" {...register("subcategory")} className={inputClass} />
          {errors.subcategory && <p className="text-xs text-destructive mt-1">{errors.subcategory.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Metode Pembayaran</label>
          <input type="text" placeholder="opsional" {...register("payment_method")} className={inputClass} />
          {errors.payment_method && <p className="text-xs text-destructive mt-1">{errors.payment_method.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Tanggal Transaksi</label>
          <input
            type="date"
            {...register("transaction_date", {
              setValueAs: (value) => (value === "" ? undefined : value),
            })}
            className={inputClass}
          />
          {errors.transaction_date && <p className="text-xs text-destructive mt-1">{errors.transaction_date.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Deskripsi</label>
          <textarea rows={3} placeholder="opsional" {...register("description")} className={inputClass} />
          {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
        </div>

        {createExpenseMutation.isError && (
          <div className="md:col-span-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{createExpenseMutation.error instanceof Error ? createExpenseMutation.error.message : "Gagal menambahkan transaksi"}</div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-primary text-primary-foreground
              text-sm font-medium
              hover:bg-primary/90 active:bg-primary/80
              transition-colors duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
            {isLoading ? "Menyimpan..." : "Simpan Transaksi"}
          </button>
        </div>
      </form>
    </div>
  );
}
