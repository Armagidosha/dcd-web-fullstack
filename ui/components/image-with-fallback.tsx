"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

export default function ImageWithFallback({
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const fallback = "/images/fallback.png";
  const imageSrc = !src || error ? fallback : src;
  return (
    <Image
      {...props}
      src={imageSrc}
      onError={(e) => {
        setError(true);
        props.onError?.(e);
      }}
    />
  );
}
