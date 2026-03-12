import { cn } from "@/lib/utils/functions/cn";

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("py-12 max-w-7xl w-full mx-auto", className)}
      {...props}
    />
  );
}

export function SectionTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-2xl font-semibold text-center mb-8", className)}
      {...props}
    />
  );
}
