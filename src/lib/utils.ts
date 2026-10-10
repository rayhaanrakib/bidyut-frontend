import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/** backend stores money in integer paisa — always divide at the edge */
export const formatBDT = (paisa: number, lang: string = "en") => {
  const bdt = paisa / 100;
  return `৳ ${bdt.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}`;
};

export const shortId = (id: string) => {
  return id.slice(0, 8);
};
 
export const formatDate = (date: string | Date, lang: string = "en", pattern = "d MMM, h:mm a") =>
  format(new Date(date), pattern, { locale: lang === "bn" ? bn : undefined });

export const roleHome = (role?: string | null): string => {
  switch (role) {
    case "ADMIN": return "/admin";
    case "POWER_OPERATOR": return "/operator";
    case "FIELD_TECHNICIAN": return "/technician";
    case "CUSTOMER": return "/customer";
    default: return "/";
  }
};