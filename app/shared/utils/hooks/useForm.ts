import { useCallback, useState } from "react";

interface UseFormOptions<T> {
  initialValues: T;
}

type PossibleValues = string | number | boolean | File | File[] | null;

export const useForm = <T>({
  initialValues,
  onChangeWrapper,
}: UseFormOptions<T> & {
  onChangeWrapper?: (name: keyof T, value: T[keyof T]) => void;
}) => {
  const [inputs, setInputs] = useState<T>(initialValues);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      let newValue: PossibleValues;

      switch (target.type) {
        case "checkbox":
          newValue = target.checked;
          break;
        case "file":
          newValue = target.multiple
            ? Array.from(target.files ?? [])
            : (target.files?.[0] ?? null);
          break;
        default:
          newValue = target.value;
      }

      setInputs((prev) => ({ ...prev, [target.name]: newValue }));

      if (onChangeWrapper) {
        onChangeWrapper(target.name as keyof T, newValue as T[keyof T]);
      }
    },
    [onChangeWrapper],
  );

  const resetForm = useCallback(() => {
    setInputs(initialValues);
  }, [initialValues]);

  return { inputs, handleChange, resetForm };
};
