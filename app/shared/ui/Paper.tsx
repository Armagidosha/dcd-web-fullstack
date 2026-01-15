import clsx from "clsx";

interface PaperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  variant?: keyof typeof variants;
  withBorder?: boolean;
  withGradient?: boolean;
}

const variants = {
  primary: "bg-surface",
  secondary: "bg-surface-variant",
} as const;

export default function Paper({
  withGradient = false,
  variant = "primary",
  withBorder,
  className,
  children,
  ...props
}: PaperProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl",
        { "border border-border/80": withBorder },
        withGradient ? "gradient-bg" : variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
