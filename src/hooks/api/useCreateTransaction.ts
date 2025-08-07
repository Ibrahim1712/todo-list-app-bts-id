import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  transactionService,
  type TransactionRequest,
} from "@/services/transactionService";
import { useState } from "react";

interface useCreateTransactionProps {
  service_code: string;
  service_tariff: number;
}

export const useCreateTransaction = ({
  service_code,
  service_tariff,
}: useCreateTransactionProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const transactionMutation = useMutation({
    mutationFn: (data: TransactionRequest) =>
      transactionService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
    },
  });

  const handlePayment = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmPayment = () => {
    transactionMutation.mutate(
      { service_code: service_code },
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
    transactionMutation.reset();
  };

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(service_tariff);

  return {
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    isResultDialogOpen,
    setIsResultDialogOpen,
    transactionMutation,
    handlePayment,
    handleConfirmPayment,
    handleCloseResult,
    formattedAmount,
  };
};
