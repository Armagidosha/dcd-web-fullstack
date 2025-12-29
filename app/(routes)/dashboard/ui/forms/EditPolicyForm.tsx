import { useState } from "react";
import Button from "@/app/shared/ui/Button";
import MarkdownEditor from "@/app/shared/ui/MarkDownEditor";
import { useAsync } from "@/app/shared/utils/hooks";

interface EditPolicyFormProps {
  initialState: string | undefined;
  onSubmit: ({ content }: { content: string }) => Promise<void>;
  onCancel?: () => void;
}

export default function EditPolicyForm({
  initialState,
  onSubmit,
  onCancel,
}: EditPolicyFormProps) {
  const [data, setData] = useState<string>(initialState ?? "");

  const { isLoading, errors, clearFieldError, execute } = useAsync();

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    clearFieldError(name);
    setData(value);
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    execute(() => onSubmit({ content: data }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Изменить политику</h2>
      <MarkdownEditor
        name="content"
        label={"Контент раздела"}
        description="От 3 символов"
        value={data || ""}
        errors={errors?.content}
        onChange={handleChange}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          className="flex-2"
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </Button>

        {onCancel && (
          <Button
            className="bg-primary! flex-1"
            type="button"
            onClick={() => onCancel()}
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
}
