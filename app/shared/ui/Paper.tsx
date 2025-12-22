import clsx from "clsx";

interface PaperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  withBorder?: boolean;
}

export default function Paper({
  withBorder,
  className,
  children,
  ...props
}: PaperProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-surface overflow-hidden",
        { "border border-border": withBorder },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
