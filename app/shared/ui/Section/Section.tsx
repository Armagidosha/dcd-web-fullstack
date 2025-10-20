import { clsx } from "clsx";
import type { ReactNode } from "react";
import st from "./Section.module.scss";

interface SectionProps {
  children: ReactNode;
  title?: string;
  fullH?: boolean;
  extraClass?: string;
}

const Section = ({
  children,
  title,
  fullH = false,
  extraClass = undefined,
}: SectionProps) => {
  return (
    <section className={clsx([st.section], extraClass, { "h-full": fullH })}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
