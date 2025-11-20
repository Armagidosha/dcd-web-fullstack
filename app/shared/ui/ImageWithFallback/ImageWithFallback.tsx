"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const fallback = "/images/fallback.png";
  const source = typeof src === "string" ? (!src.length ? fallback : src) : src;
  return (
    <Image
      {...props}
      onError={() => setError(true)}
      src={error ? fallback : source}
    />
  );
}
