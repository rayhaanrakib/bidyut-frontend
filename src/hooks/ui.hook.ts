import { useState, useEffect } from "react";

export const useDebounce = <T,>(value: T, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

export const usePagination = (totalPages = 1) => {
  const [page, setPage] = useState(1);
  return { page, setPage, canPrev: page > 1, canNext: page < totalPages };
};