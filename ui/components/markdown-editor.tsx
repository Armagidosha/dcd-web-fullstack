import { cn } from "@/lib/utils/functions/cn";
import { Field, FieldError, FieldLabel } from "../primitives/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../primitives/tabs";
import { Textarea } from "../primitives/textarea";
import MarkdownRenderer from "./markdown-renderer";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  errors?: Array<{ message?: string } | undefined>;
  label?: string;
  fieldName?: string;
  styles?: {
    textarea?: string;
    renderer?: string;
  };
};

export function MarkdownEditor({
  value,
  onChange,
  errors = [],
  label,
  fieldName,
  styles,
}: MarkdownEditorProps) {
  return (
    <Tabs defaultValue="edit">
      <TabsList>
        <TabsTrigger value="edit">Редактировать</TabsTrigger>
        <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <Field>
          {label && <FieldLabel htmlFor={fieldName}>{label}</FieldLabel>}
          <Textarea
            id={fieldName}
            name={fieldName}
            className={cn(styles?.textarea)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errors.length}
          />
          <FieldError errors={errors} />
        </Field>
      </TabsContent>
      <TabsContent value="preview">
        <div className="bg-input/30 p-2 rounded-lg">
          <MarkdownRenderer className={cn("min-h-12", styles?.renderer)}>
            {value}
          </MarkdownRenderer>
        </div>
      </TabsContent>
    </Tabs>
  );
}
