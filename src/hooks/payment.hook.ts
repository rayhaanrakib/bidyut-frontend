import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkoutSession, myPayments, paymentByTransaction, refund } from "@/api";

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkoutSession,
  });
};

export const useMyPayments = (page = 1) => {
  return useQuery({
    queryKey: ["payments", page],
    queryFn: () => myPayments(page),
  });
};

export const usePaymentByTransaction = (transactionId: string | null) => {
  return useQuery({
    queryKey: ["payment", transactionId],
    queryFn: () => paymentByTransaction(transactionId as string),
    enabled: Boolean(transactionId),
    refetchInterval: 5000,
  });
};

export const useRefund = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: refund,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payments"] }),
  });
};