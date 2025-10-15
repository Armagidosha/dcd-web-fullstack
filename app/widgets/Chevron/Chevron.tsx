"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ChevronProps {
  extraClass: string;
  size: number;
  hideOnScroll?: boolean;
}

const Chevron = ({ extraClass, size, hideOnScroll }: ChevronProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideOnScroll]);

  return (
    <Image
      className={`${extraClass} ${isScrolled ? "hidden" : ""}`}
      width={size}
      height={size}
      src="/icons/right-chevron.svg"
      alt="\/"
      unoptimized
    />
  );
};

export default Chevron;
