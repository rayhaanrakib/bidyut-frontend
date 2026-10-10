"use client";

import { deleteCookie, getCookie, setCookie } from "./cookies";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenStore = {
  getAccessToken: (): string | null => {
    return getCookie(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: (): string | null => {
    return getCookie(REFRESH_TOKEN_KEY);
  },
  get: (): string | null => {
    return getCookie(ACCESS_TOKEN_KEY);
  },
  setAccessToken: (token: string, maxAgeSec: number = 60 * 60): void => {
    setCookie(ACCESS_TOKEN_KEY, token, { maxAge: maxAgeSec });
  },
  setRefreshToken: (token: string, maxAgeSec: number = 60 * 60 * 24 * 7): void => {
    setCookie(REFRESH_TOKEN_KEY, token, { maxAge: maxAgeSec });
  },
  set: (token: string): void => {
    setCookie(ACCESS_TOKEN_KEY, token, { maxAge: 60 * 60 });
  },
  setTokens: (accessToken: string, refreshToken: string): void => {
    setCookie(ACCESS_TOKEN_KEY, accessToken, { maxAge: 60 * 60 });
    setCookie(REFRESH_TOKEN_KEY, refreshToken, { maxAge: 60 * 60 * 24 * 7 });
  },
  clear: (): void => {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
  },
};