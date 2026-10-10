import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { tokenStore } from "@/lib/tokenStore";
import {
  forgotPassword,
  getMe,
  googleOAuth,
  resetPassword,
  userLogin,
  userLogout,
  userRegister,
  verifyOtp,
} from "@/api";

export const useLogin = () => useMutation({ mutationFn: userLogin });

export const useRegistration = () => useMutation({ mutationFn: userRegister });

export const useVerifyAccount = () => useMutation({ mutationFn: verifyOtp });

export const useForgotPassword = () => useMutation({ mutationFn: forgotPassword });

export const useResetPassword = () => useMutation({ mutationFn: resetPassword });

export const useGoogleOAuth = () => useMutation({ mutationFn: googleOAuth });

export const useLogout = () => useMutation({ mutationFn: userLogout });

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

export const useSignOut = () => {
  const qc = useQueryClient();
  const router = useRouter();
  const { t } = useI18n();
  const logout = useLogout();

  return {
    pending: logout.isPending,
    signOut: async () => {
      await logout.mutateAsync(undefined).catch(() => null);
      qc.cancelQueries();
      qc.setQueryData(["me"], null);
      qc.removeQueries();
      tokenStore.clear();
      toast.success(t("toast.done"));
      router.push("/");
    },
  };
};

export const useMutation2 = <TVars, TData extends { message?: string }>(
  fn: (vars: TVars) => Promise<TData>,
) => {
  const { t } = useI18n();
  return useMutation({
    mutationFn: fn,
    onSuccess: (res) => toast.success(res?.message ?? t("toast.done")),
    onError: (err: Error) => toast.error(err.message || t("toast.failed")),
  });
};