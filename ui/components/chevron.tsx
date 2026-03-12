"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/functions/cn";

interface ChevronProps {
  className: string;
}

const Chevron = ({ className }: ChevronProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ChevronDown
      className={cn(
        "transition-opacity duration-300 text-dim-text animate-bounce",
        { "opacity-1": isScrolled },
        className,
      )}
    />
  );
};

export default Chevron;
