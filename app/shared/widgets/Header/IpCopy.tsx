"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { CheckIcon, ClipboardCopyIcon } from "../../icons/icons";
import { debounce } from "../../utils/functions";

interface IpCopyProps {
  className?: string;
  ip?: string;
}

const IpCopy = ({ className, ip = "mc.draimcido.net" }: IpCopyProps) => {
  const [copied, setCopied] = useState(false);

  const debouncedCopy = useMemo(
    () =>
      debounce(() => {
        setCopied(false);
      }, 1300),
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      debouncedCopy();
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx(
        "flex items-center justify-center gap-3 px-8 py-2 rounded-full cursor-pointer",
        "transition-all duration-300 active:scale-95",
        copied ? "bg-primary/70" : "bg-primary",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-white-text text-lg font-medium tracking-wide">
          {ip}
        </span>
        <div className="relative w-5 h-5">
          <ClipboardCopyIcon
            className={clsx(
              "absolute right-0 text-white-text transition-[discrete opacity] duration-300",
              copied
                ? "opacity-0 scale-0 rotate-180"
                : "opacity-100 scale-100 rotate-0",
            )}
            width={20}
            height={20}
          />
          <CheckIcon
            className={clsx(
              "absolute right-0 text-success transition-[discrete opacity] duration-300",
              copied
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-0 -rotate-180",
            )}
            width={20}
            height={20}
          />
        </div>
      </div>
    </button>
  );
};

export default IpCopy;
