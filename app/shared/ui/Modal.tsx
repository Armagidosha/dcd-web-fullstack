"use client";

import clsx from "clsx";
import { FocusTrap } from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CrossIcon } from "../icons/icons";
import { hasWindow } from "../utils/functions";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const modalSize = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
};

export default function Modal({
  opened,
  onClose,
  title,
  children,
  className = "",
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!opened) return;
    // Закрытие на ESC
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // Скрываем scroll у body, вешаем слушатель
    document.body.classList.add("overflow-y-hidden");
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-y-hidden");
      document.removeEventListener("keydown", onKey);
    };
  }, [opened, onClose]);

  if (!hasWindow()) return null;

  return createPortal(
    <AnimatePresence>
      {opened && (
        <FocusTrap>
          <motion.div
            className={"fixed inset-0 z-50 flex items-center justify-center"}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={"modal"}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              onClick={onClose}
            />
            <motion.div
              className={`relative flex flex-col z-10 w-[95%] min-h-[60vh] max-h-[90vh] mx-4 rounded-2xl bg-surface/90 backdrop-blur-xs p-6 shadow-xl ${modalSize[size]}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
              aria-label={title ? undefined : "modal"}
              initial={{ translateY: -20 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: -20 }}
            >
              {/* Хедер модалки */}
              <div className="relative pr-8">
                {title && (
                  // Заголовок
                  <h2 id="modal-title" className="text-lg font-semibold">
                    {title}
                  </h2>
                )}

                {/* Кнопка закрытия модалки */}
                <button
                  className="absolute -right-2 top-2/4 -translate-y-2/4 rounded-lg p-2 transition-colors duration-300 hover:bg-primary focus-visible:outline-1 cursor-pointer"
                  type="button"
                  onClick={onClose}
                  aria-label="Закрыть"
                >
                  <CrossIcon />
                </button>
              </div>

              {/* Контент модалки */}
              <div
                className={clsx(
                  "flex flex-col flex-1 mt-4 pr-2 gap-4 overflow-y-auto overflow-x-hidden",
                  className,
                )}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>,
    document.body,
  );
}
