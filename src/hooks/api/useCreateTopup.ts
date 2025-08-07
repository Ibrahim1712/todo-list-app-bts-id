import { useMutation, useQueryClient } from "@tanstack/react-query";
import { topupService, type TopupRequest } from "@/services/topupService";
import { useState } from "react";

export const useCreateTopup = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const topupMutation = useMutation({
    mutationFn: (data: TopupRequest) => topupService.createTopup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
    },
  });

  const handleTopup = () => {
    const numAmount = parseInt(amount.replace(/\D/g, ""));

    // Validasi amount hanya boleh angka dan tidak boleh lebih kecil dari 0
    if (!numAmount || numAmount <= 0) {
      return;
    }

    setIsConfirmDialogOpen(true);
  };

  const handleConfirmTopup = () => {
    const numAmount = parseInt(amount.replace(/\D/g, ""));

    topupMutation.mutate(
      { top_up_amount: numAmount },
      {
        onSuccess: () => {
          setIsConfirmDialogOpen(false);
          setIsResultDialogOpen(true);
        },
        onError: () => {
          setIsConfirmDialogOpen(false);
          setIsResultDialogOpen(true);
        },
      }
    );
  };

  const handleCloseResult = () => {
    setIsResultDialogOpen(false);
    topupMutation.reset();
    setAmount("");
  };

  const handleAmountChange = (value: string) => {
    // Hanya izinkan angka
    const numericValue = value.replace(/\D/g, "");

    // Format sebagai mata uang IDR
    if (numericValue) {
      const formattedValue = new Intl.NumberFormat("id-ID").format(
        parseInt(numericValue)
      );
      setAmount(formattedValue);
    } else {
      setAmount("");
    }
  };

  const formattedAmount = amount
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(parseInt(amount.replace(/\D/g, "")))
    : "";

  const numericAmount = parseInt(amount.replace(/\D/g, "")) || 0;
  const isValidAmount = numericAmount > 0;

  return {
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    isResultDialogOpen,
    setIsResultDialogOpen,
    topupMutation,
    handleTopup,
    handleConfirmTopup,
    handleCloseResult,
    amount,
    handleAmountChange,
    formattedAmount,
    isValidAmount,
  };
};
