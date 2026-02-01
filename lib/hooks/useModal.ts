import { useState } from "react";

export function useModal<T>() {
  const [data, setData] = useState<T | null>(null);

  return {
    data,
    opened: data !== null,
    open: (value: T) => setData(value),
    close: () => setData(null),
  };
}
