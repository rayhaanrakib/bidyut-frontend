"use client";

const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
};

type CookieOptions = {
  path?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  maxAge?: number;
  expires?: Date;
  domain?: string;
};

const serialize = (name: string, value: string, options: CookieOptions = {}): string => {
  const opts = { ...COOKIE_OPTIONS, ...options };
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (opts.maxAge !== undefined) {
    cookie += `; Max-Age=${Math.floor(opts.maxAge)}`;
  }
  if (opts.expires) {
    cookie += `; Expires=${opts.expires.toUTCString()}`;
  }
  if (opts.path) {
    cookie += `; Path=${opts.path}`;
  }
  if (opts.domain) {
    cookie += `; Domain=${opts.domain}`;
  }
  if (opts.secure) {
    cookie += "; Secure";
  }
  if (opts.sameSite) {
    cookie += `; SameSite=${opts.sameSite.charAt(0).toUpperCase() + opts.sameSite.slice(1)}`;
  }

  return cookie;
};

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  if (typeof document === "undefined") return;
  document.cookie = serialize(name, value, options);
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const prefix = `${encodeURIComponent(name)}=`;

  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(prefix)) {
      try {
        return decodeURIComponent(trimmed.slice(prefix.length));
      } catch {
        return trimmed.slice(prefix.length);
      }
    }
  }

  return null;
};

export const deleteCookie = (name: string, options: Pick<CookieOptions, "path" | "domain"> = {}): void => {
  if (typeof document === "undefined") return;
  document.cookie = serialize(name, "", {
    ...options,
    maxAge: 0,
    expires: new Date(0),
  });
};