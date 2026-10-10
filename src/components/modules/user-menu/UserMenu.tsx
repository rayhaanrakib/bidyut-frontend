"use client";

import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSignOut } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { roleHome } from "@/lib/utils";

export default function UserMenu() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { signOut, pending } = useSignOut();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-2.5 text-sm font-medium transition hover:border-primary/50"
      >
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? <UserRound className="h-4 w-4" />}
          </span>
        )}
        <span className="hidden max-w-28 truncate sm:block">{user?.name}</span>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-card shadow-xl">
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
          <Link
            href={roleHome(user?.role)}
            onClick={() => setOpen(false)}
            role="menuitem"
            className="block px-4 py-2.5 text-sm hover:bg-surface"
          >
            {t("nav.dashboard")}
          </Link>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="block px-4 py-2.5 text-sm hover:bg-surface"
          >
            {t("dash.profile")}
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={signOut}
            disabled={pending}
            className="flex w-full items-center gap-2 border-t border-line px-4 py-2.5 text-left text-sm text-destructive hover:bg-surface disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" /> {pending ? t("auth.submitting") : t("nav.logout")}
          </button>
        </div>
      )}
    </div>
  );
}