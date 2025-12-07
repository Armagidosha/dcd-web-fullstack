import clsx from "clsx";

type Datalist = {
  id: string;
  value: string;
};

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  errors?: string[];
  label?: string;
  description?: string;
  dataList?: Datalist[];
}

export default function TextInput({
  label,
  description,
  errors,
  placeholder,
  value,
  onChange,
  disabled,
  className = "",
  dataList,
  ...props
}: TextInputProps) {
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
      <input
        {...props}
        autoComplete="off"
        id={props.name}
        name={props.name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          `px-4 py-3 rounded-lg border border-border text-sm bg-surface-variant 
          focus:outline-none focus:ring-2 transition-colors duration-300
          disabled:bg-surface-variant/80 disabled:cursor-not-allowed`,
          errors && errors.length > 0 ? "ring-2 ring-primary" : "",
        )}
        list={dataList && `${props.name}List`}
      />

      {dataList && (
        <datalist id={`${props.name}List`}>
          {dataList.map((data) => (
            <option key={data.id} value={data.value}></option>
          ))}
        </datalist>
      )}

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
