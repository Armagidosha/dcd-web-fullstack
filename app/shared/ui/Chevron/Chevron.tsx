"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChevronIcon } from "../../icons/icons";

interface ChevronProps {
  className: string;
}

const Chevron = ({ className: extraClass }: ChevronProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ChevronIcon
      className={clsx(
        extraClass,
        "transition-opacity duration-300 text-dim-text",
        {
          "opacity-1": isScrolled,
        },
      )}
    />
  );
};

export default Chevron;
