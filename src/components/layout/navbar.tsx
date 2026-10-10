"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, LogOut, Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { cn, roleHome } from "@/lib/utils";
import { useSignOut } from "@/hooks";
import { Button } from "../ui/button";
import UserMenu from "../modules/user-menu/UserMenu";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { signOut, pending } = useSignOut();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#how", label: t("nav.how") },
    { href: "/#pricing", label: t("nav.pricing") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-line bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_24px_-6px] shadow-accent/60">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">BIDYUT</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LangToggle />
          <ThemeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button size="sm">{t("nav.login")}</Button>
            </Link>
          )}
        </div>

        <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-line bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-surface">
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <LangToggle />
                <ThemeToggle />
              </div>
              {user ? (
                <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3" onClick={() => setOpen(false)}>
                  <Link href={roleHome(user.role)}>
                    <Button size="sm" className="w-full">
                      <LayoutDashboard className="h-4 w-4" /> {t("nav.dashboard")}
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="w-full text-destructive hover:text-destructive"
                    disabled={pending} onClick={signOut}>
                    <LogOut className="h-4 w-4" /> {pending ? t("auth.submitting") : t("nav.logout")}
                  </Button>
                </div>
              ) : (
                <Link href="/login" className="mt-2" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full">{t("nav.login")}</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};