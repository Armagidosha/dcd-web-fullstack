import clsx from "clsx";
import type React from "react";
import st from "./Section.module.scss";

export type Axis = "row" | "column";

interface SectionProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  axis?: Axis;
  outerGap?: string;
  innerGap?: string;
  className?: string;
  titleClassName?: string;
  fullH?: boolean;
}

export default function Section({
  children,
  title,
  axis = "column",
  outerGap = "3rem",
  innerGap = "1rem",
  className = undefined,
  titleClassName = undefined,
  fullH = false,
}: SectionProps) {
  const wrapperClasses = clsx(
    st.flex,
    st.column,
    st.section,
    { "h-full": fullH },
    className,
  );

  const contentClasses = clsx(
    st.flex,
    axis === "row" ? st.row : st.column,
    "container",
  );

  return (
    <section style={{ gap: outerGap }} className={wrapperClasses}>
      {title && (
        <div className={clsx(titleClassName)}>
          {typeof title === "string" ? (
            <h2 className="text-xl">{title}</h2>
          ) : (
            title
          )}
        </div>
      )}
      <div style={{ gap: innerGap }} className={contentClasses}>
        {children}
      </div>
    </section>
  );
}
