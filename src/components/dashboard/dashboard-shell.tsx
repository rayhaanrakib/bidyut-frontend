"use client";

import { Suspense, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Menu,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  adminRoutes,
  customerRoutes,
  operatorRoutes,
  technicianRoutes,
  type RouteItem,
} from "@/routes";

const ROUTES: Record<string, RouteItem[]> = {
  CUSTOMER: customerRoutes,
  FIELD_TECHNICIAN: technicianRoutes,
  POWER_OPERATOR: operatorRoutes,
  ADMIN: adminRoutes,
};

const DashboardShellSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] flex-col overflow-y-auto bg-[#0b1411] p-5 lg:flex animate-pulse">
        <div className="flex flex-1 flex-col">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="h-11 w-11 rounded-2xl bg-white/10" />
            <div className="space-y-1.5">
              <div className="h-4 w-20 rounded bg-white/10" />
              <div className="h-2.5 w-28 rounded bg-white/5" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="mb-3 h-3 w-16 px-3 rounded bg-white/5" />
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-11 w-full rounded-xl bg-white/[0.04]"
              />
            ))}
          </div>

          <div className="mt-auto pt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="h-10 w-10 rounded-xl bg-white/10" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 w-24 rounded bg-white/10" />
                <div className="h-2.5 w-16 rounded bg-white/5" />
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="h-11 w-full rounded-xl bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-9 animate-pulse">
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
            <div className="h-3 w-40 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1600px] p-4 sm:p-6 lg:p-9 animate-pulse">
          <div className="space-y-6">
            <div className="h-32 w-full rounded-3xl border border-border/70 bg-card/50" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 rounded-3xl border border-border/70 bg-card/50" />
              ))}
            </div>
            <div className="h-80 w-full rounded-3xl border border-border/70 bg-card/50" />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardShellMain = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const items = user ? (ROUTES[user.role] ?? []) : [];

  const activeItem = [...items]
    .filter(
      (item) =>
        pathname === item.url ||
        (item.url !== "/" && pathname.startsWith(`${item.url}/`)),
    )
    .sort((a, b) => b.url.length - a.url.length)[0];

  const navigation = (
    <nav className="space-y-1">
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
        Workspace
      </p>

      {items.map((item) => {
        const active = activeItem?.url === item.url;

        return (
          <Link
            key={item.url}
            href={item.url}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm transition-all duration-200",
              active
                ? "bg-emerald-400/10 font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/15"
                : "text-white/60 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            <span>{t(item.label)}</span>
            {active && <ChevronRight className="h-4 w-4 text-emerald-300" />}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarFooter = (
    <div className="space-y-2 border-t border-white/10 pt-4">
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white"
      >
        <Home className="h-4 w-4" />
        Back to Home
        <ArrowLeft className="ml-auto h-4 w-4" />
      </Link>
    </div>
  );

  const sidebarContent = (
    <>
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="group mb-10 flex items-center gap-3 px-2"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-[#07130f] shadow-lg shadow-emerald-400/15 transition-transform group-hover:rotate-[-6deg]">
          <Zap className="h-6 w-6 fill-current" />
        </span>

        <span>
          <span className="block text-lg font-black tracking-[0.12em] text-white">
            BIDYUT
          </span>
          <span className="block text-[10px] tracking-[0.18em] text-white/40">
            POWER MANAGEMENT
          </span>
        </span>
      </Link>

      {navigation}

      <div className="mt-auto pt-8">
        {user && (
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-sm font-bold text-emerald-300">
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user.name}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-white/45">
                {user.role.replaceAll("_", " ")}
              </p>
            </div>
          </div>
        )}

        {sidebarFooter}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] flex-col overflow-y-auto bg-[#0b1411] p-5 lg:flex">
        <div className="flex flex-1 flex-col">{sidebarContent}</div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-xl border border-border p-2.5 transition hover:bg-accent/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground sm:text-base">
                {activeItem ? t(activeItem.label) : "Dashboard"}
              </p>

              <p className="hidden text-xs text-muted sm:block">
                Welcome back{user?.name ? `, ${user.name}` : ""}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold transition hover:border-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 sm:text-sm md:hidden"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </header>

        <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1600px] p-4 sm:p-6 lg:p-9">
          {children}
        </main>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(300px,85vw)] flex-col overflow-y-auto bg-[#0b1411] p-5 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-bold tracking-[0.15em] text-white">
                  NAVIGATION
                </span>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col">{sidebarContent}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<DashboardShellSkeleton />}>
      <DashboardShellMain>{children}</DashboardShellMain>
    </Suspense>
  );
};