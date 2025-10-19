import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  orientation?: "row" | "column" | "row-reverse" | "column-reverse";
  fullH?: boolean;
  extraClass?: string;
}

const Section = ({
  children,
  orientation = "row",
  fullH = false,
  extraClass = "",
}: SectionProps) => {
  return (
    <section
      className={`section ${extraClass} ${fullH ? "h-full" : ""}`}
      style={{ flexDirection: orientation }}
    >
      {children}
    </section>
  );
};

export default Section;
