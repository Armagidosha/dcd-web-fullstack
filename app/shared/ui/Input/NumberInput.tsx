import clsx from "clsx";
import { ChevronIcon } from "../../icons/icons";

interface NumberInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  > {
  name: string;
  errors?: string[];
  label?: string;
  description?: string;
  onChange: (value: number | "") => void;
  step?: number;
  min?: number;
  max?: number;
  value: string;
}

export default function NumberInput({
  label,
  description,
  errors,
  placeholder,
  value,
  onChange,
  disabled,
  min,
  max,
  step = 25,
  className = "",
  ...props
}: NumberInputProps) {
  const handleIncrement = () => {
    const newValue = (+value || 0) + Number(step);
    if (max == null || newValue <= max) {
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Number(value || 0) - step;
    if (min === undefined || newValue >= Number(min)) {
      onChange?.(newValue);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value;

    // Разрешаем пустое поле и минус
    if (val === "" || val === "-") {
      onChange?.("");
      return;
    }

    const num = Number(val);

    // Разрешаем ввод, только блокируем если превышен max
    if (max != null && num > max) return;

    onChange?.(num);
  };

  return (
    <div className={clsx("relative flex flex-col gap-1", className)}>
      <label
        htmlFor={props.name}
        className="text-sm font-medium text-light-text"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-light-text/50 -mt-0.5 mb-1">{description}</p>
      )}

      <div className="relative">
        <input
          {...props}
          // autoComplete="off"
          id={props.name}
          name={props.name}
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={clsx(
            `w-full px-4 py-3 rounded-lg border border-border text-sm bg-surface-variant
          focus:outline-none focus:ring-2 transition-colors duration-300
          disabled:bg-surface-variant/80 disabled:cursor-not-allowed
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none`,
            errors ? "ring-primary" : "",
          )}
        />

        <div className="absolute right-0 top-0 h-full flex flex-col">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={
              disabled || (max !== undefined && Number(value) >= Number(max))
            }
            className={`
              flex-1 px-2 text-dim-text disabled:text-light-text/50
              disabled:bg-primary/20 
              disabled:cursor-not-allowed transition-colors border-l border-border 
              hover:bg-primary hover:text-light-text rounded-br`}
          >
            <ChevronIcon width={18} height={18} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={
              disabled || (min !== undefined && Number(value) <= Number(min))
            }
            className={`
              flex-1 px-2 text-dim-text disabled:text-light-text/50
              disabled:bg-primary/20 
              disabled:cursor-not-allowed transition-colors border-l border-border 
              hover:bg-primary hover:text-light-text rounded-br`}
          >
            <ChevronIcon width={18} height={18} />
          </button>
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
