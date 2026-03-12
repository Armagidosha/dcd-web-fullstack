"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const fallback = "/images/fallback.png";
  return error ? (
    <Image src={fallback} {...props} />
  ) : (
    <Image src={src} onError={() => setError(true)} {...props} />
  );
}
