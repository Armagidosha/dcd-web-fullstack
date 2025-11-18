"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const fallback = "/images/fallback1.png";

  return (
    <Image
      {...props}
      onError={() => setError(true)}
      src={error ? fallback : src}
    />
  );
}
