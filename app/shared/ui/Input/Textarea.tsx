import clsx from "clsx";

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  errors?: string[];
}

export default function Textarea({
  label,
  name,
  value,
  description,
  placeholder,
  onChange,
  required,
  errors,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {description && (
        <p className="text-xs text-light-text/50 -mt-0.5 mb-1">{description}</p>
      )}

      <textarea
        autoComplete="off"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={clsx(
          `px-4 py-3 min-h-50 rounded-lg border border-border text-sm bg-surface-variant 
                  focus:outline-none focus:ring-2 transition-colors duration-300
                  disabled:bg-surface-variant/80 disabled:cursor-not-allowed`,
          errors && errors.length > 0 ? "ring-2 ring-primary" : "",
        )}
      />

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
