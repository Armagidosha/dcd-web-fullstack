"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ChevronProps {
  className: string;
  size: number;
  hideOnScroll?: boolean;
}

const Chevron = ({ className, size, hideOnScroll }: ChevronProps) => {
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
      className={clsx(className, {
        "opacity-0 pointer-events-none transition-opacity": isScrolled,
      })}
      width={size}
      height={size}
      src="/icons/chevron-down.svg"
      alt="\/"
      unoptimized
    />
  );
};

export default Chevron;
