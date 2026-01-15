import clsx from "clsx";
import { CheckIcon } from "../../icons/icons";

interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  > {
  name: string;
  label?: string;
  description?: string;
  errors?: string[];
}

export default function Checkbox({
  label,
  name,
  checked,
  description,
  onChange,
  required,
  errors,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-start">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={clsx(
              `peer relative appearance-none shrink-0 w-5 h-5 rounded-md ring-1 ring-border
              bg-surface-variant transition-all duration-300 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-offset-surface
              checked:bg-primary checked:ring-primary
              disabled:bg-surface-variant/80 disabled:cursor-not-allowed disabled:opacity-50`,
              errors && errors.length > 0 ? "ring-2 ring-primary" : "",
              className,
            )}
            {...props}
          />

          <CheckIcon
            className={clsx(
              `absolute w-5 h-5 pointer-events-none hidden peer-checked:block stroke-white
              transition-all duration-200`,
              disabled && "opacity-50",
            )}
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor={name}
            className={clsx(
              "select-none cursor-pointer text-sm leading-tight",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-light-text/50 mt-1">{description}</p>
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
