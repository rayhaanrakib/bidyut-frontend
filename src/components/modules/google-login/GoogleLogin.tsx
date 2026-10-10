"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGoogleOAuth } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { tokenStore } from "@/lib/tokenStore";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { t } = useI18n();
  const qc = useQueryClient();
  const redirect = useSearchParams().get("redirect");
  const { mutate: googleLogin } = useGoogleOAuth();

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(res) =>
          googleLogin(
            { idToken: res.credential ?? "" },
            {
              onSuccess: (session) => {
                tokenStore.setTokens(session.data.accessToken, session.data.refreshToken);
                if (typeof window !== "undefined") {
                  window.localStorage.removeItem("accessToken");
                }
                qc.setQueryData(["me"], { data: { user: session.data.user } });
                toast.success(session.message ?? t("toast.done"));
                router.push(redirect ?? "/");
              },
              onError: (err) => toast.error(err.message || t("toast.failed")),
            },
          )
        }
        onError={() => toast.error(t("toast.failed"))}
      />
    </div>
  );
}