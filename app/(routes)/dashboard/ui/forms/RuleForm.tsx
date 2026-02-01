import { useState } from "react";
import Button from "@/app/shared/ui/Button";
import TextInput from "@/app/shared/ui/Input/TextInput";
import MarkdownEditor from "@/app/shared/ui/MarkDownEditor";
import { useAsync } from "@/app/shared/utils/hooks";
import type { Rule } from "@/lib/generated/prisma/client";
import { PlusIcon } from "@/ui/icons/ui.icons";

interface AddRuleFormProps {
  title: string;
  action: "add" | "edit";
  initialData?: Rule;
  onSubmit: (ruleData: Pick<Rule, "title" | "content">) => Promise<void>;
  onCancel?: () => void;
}

export default function RuleForm({
  title,
  action,
  initialData,
  onSubmit,
  onCancel,
}: AddRuleFormProps) {
  const [ruleData, setRuleData] = useState(
    initialData ?? {
      title: "",
      content: "",
    },
  );

  const { isLoading, errors, clearFieldError, execute } = useAsync();

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    clearFieldError(name);
    setRuleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    execute(onSubmit, {
      title: ruleData.title,
      content: ruleData.content,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <TextInput
        name="title"
        value={ruleData?.title || ""}
        errors={errors?.title}
        onChange={handleInputChange}
        placeholder="Введите название"
        description="От 3 до 24 символов "
        label="Название раздела"
        required
      />
      <MarkdownEditor
        name="content"
        label={"Контент раздела"}
        description="От 3 символов"
        value={ruleData?.content || ""}
        errors={errors?.content}
        onChange={handleInputChange}
        required
      />

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          className="flex-2"
          variant="secondary"
          type="submit"
          icon={action === "add" ? <PlusIcon /> : undefined}
          disabled={isLoading || (errors && Object.keys(errors).length > 0)}
        >
          {action === "add"
            ? isLoading
              ? "Добавление..."
              : "Добавить раздел"
            : isLoading
              ? "Сохранение..."
              : "Сохранить"}
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
