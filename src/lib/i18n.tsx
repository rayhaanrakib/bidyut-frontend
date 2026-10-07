"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, type DictKey } from "./dictionaries";

export type Lang = "en" | "bn";

interface I18nCtx {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey) => string;
}

const Ctx = createContext<I18nCtx | null>(null);
const LANG_KEY = "bidyut.lang";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (localStorage.getItem(LANG_KEY) as Lang) || "en";
    setLangState(saved);
    document.documentElement.lang = saved;
  }, []);

  const setLang = (lang: Lang) => {
    setLangState(lang);
    localStorage.setItem(LANG_KEY, lang);
    document.cookie = `bidyut.lang=${lang}; path=/; max-age=31536000; samesite=lax`; // readable server-side too
    document.documentElement.lang = lang; // also switches the font
  };

  const t = (key: DictKey) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
};