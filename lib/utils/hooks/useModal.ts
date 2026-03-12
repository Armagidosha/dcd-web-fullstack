import { useState } from "react";

export function useModal<T, M extends string>() {
  const [data, setData] = useState<T | null>(null);
  const [mode, setMode] = useState<M | null>(null);

  const open = (value: T, modalMode: M) => {
    setData(value);
    setMode(modalMode);
  };

  const close = () => {
    setMode(null);
    setTimeout(() => {
      setData(null);
    }, 150);
  };

  return {
    data,
    mode,
    opened: mode !== null,
    open,
    close,
  };
}
