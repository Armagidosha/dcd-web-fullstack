"use client";

import clsx from "clsx";
import { useState } from "react";
import { CrossIcon, PaperClipIcon } from "../../icons/icons";

interface FileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  errors?: string[];
  label?: string;
  description?: string;
  onReset: () => void;
}

export default function FileInput({
  name,
  label,
  description,
  errors,
  placeholder = "Выбери файл",
  onChange,
  onReset,
  disabled,
  multiple,
  accept,
  className = "",
  ...props
}: FileInputProps) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      if (multiple) {
        const formattedName =
          files.length === 1 ? "файл выбран" : "файлов выбрано";
        setFileName(`${files.length} ${formattedName}`);
      } else {
        setFileName(files[0].name);
      }
    } else {
      setFileName("");
    }
    onChange?.(e);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFileName("");
    onReset?.();
  };

  return (
    <div className={clsx("relative flex flex-col gap-1", className)}>
      <label htmlFor={name} className="text-sm font-medium text-light-text">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-light-text/50 -mt-0.5 mb-1">{description}</p>
      )}

      <div className="relative">
        {/* Input container */}
        <input
          onClick={(e) => e.stopPropagation()}
          {...props}
          type="file"
          id={name}
          name={name}
          onChange={handleChange}
          accept={accept}
          disabled={disabled}
          className="absolute inset-0 w-full cursor-pointer h-full opacity-0"
        />

        <div
          className={clsx(
            `flex justify-between px-4 py-3 rounded-lg border border-border text-sm bg-surface-variant 
                    focus:outline-none focus:border-2 transition-colors duration-300
                    disabled:bg-surface-variant/80 disabled:cursor-not-allowed`,
            errors && errors.length > 0 ? "border-2 border-primary" : "",
          )}
        >
          <span className={fileName ? "text-light-text" : "text-light-text/50"}>
            {fileName || placeholder}
          </span>
          {fileName.length ? (
            <button
              className="z-10 cursor-pointer group"
              type="button"
              onClick={handleReset}
            >
              <CrossIcon
                className="group-hover:scale-125 transition-transform duration-300 text-light-text/50"
                width={18}
                height={18}
                title="Очистить"
              />
            </button>
          ) : (
            <PaperClipIcon
              className="text-light-text/50"
              width={18}
              height={18}
            />
          )}
        </div>
      </div>

      <div className="min-h-4">
        {errors?.map((error) => (
          <p key={error} className="ml-1 text-xs text-primary select-none">
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}
