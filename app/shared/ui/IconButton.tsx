import clsx from "clsx";
import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: React.ReactElement | React.ElementType;
}

export default function IconButton({
  className,
  onClick,
  disabled,
  type = "button",
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        `p-1 cursor-pointer hover:bg-surface/20
        font-semibold rounded-sm transition-colors duration-300 flex
        items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed`,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {React.isValidElement(icon) ? icon : React.createElement(icon)}
    </button>
  );
}
