"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined;
  fallback?: string;
}

export default function ImageWithFallback({
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const fallback = "/images/fallback.png";
  const source =
    typeof src === "string" ? (!src.length ? fallback : src) : fallback;
  return (
    <Image
      {...props}
      onError={() => setError(true)}
      src={error ? fallback : source}
    />
  );
}
