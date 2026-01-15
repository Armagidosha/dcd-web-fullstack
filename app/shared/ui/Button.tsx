import clsx from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ReactElement;
  variant?: keyof typeof variants;
}

const variants = {
  primary: "bg-primary hover:bg-primary/80",
  secondary: "bg-secondary hover:bg-secondary/80",
} as const;

export default function Button({
  className,
  onClick,
  disabled,
  children,
  type = "button",
  icon,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        `w-full px-4 py-3 cursor-pointer
        font-semibold rounded-xl transition-colors duration-300 flex
        items-center justify-center gap-2`,
        "disabled:opacity-50 disabled:cursor-default",
        variants[variant],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
}
