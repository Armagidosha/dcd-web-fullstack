import clsx from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ReactElement;
}

export default function Button({
  className,
  onClick,
  disabled,
  children,
  type = "button",
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        `w-full px-4 py-3 cursor-pointer bg-secondary hover:opacity-80
        font-semibold rounded-xl transition-opacity duration-300 flex
        items-center justify-center gap-2`,
        "disabled:opacity-50 disabled:cursor-default",
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
