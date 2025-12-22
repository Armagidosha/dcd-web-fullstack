"use client";

import { useState } from "react";
import Textarea from "./Input/Textarea";
import MarkdownRenderer from "./MarkDownRenderer";

interface MarkdownEditorProps {
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name: string;
  description?: string;
  label?: string;
  errors?: string[];
}

export default function MarkdownEditor({
  value,
  name,
  errors,
  description,
  label,
  onChange,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="w-full">
      {/* Панель инструментов */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-2 px-8 rounded-full font-semibold transition-colors duration-300 ${
            activeTab === "edit" ? "bg-secondary" : "bg-surface cursor-pointer"
          }`}
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 px-8 rounded-full font-semibold transition-colors duration-300 ${
            activeTab === "preview"
              ? "bg-secondary"
              : "bg-surface cursor-pointer"
          }`}
        >
          Предпросмотр
        </button>
      </div>

      {/* Контент */}
      {activeTab === "edit" ? (
        <Textarea
          label={label || ""}
          description={description || ""}
          name={name}
          value={value}
          onChange={onChange}
          errors={errors || []}
          required
        />
      ) : (
        <div className="w-full min-h-50 px-4 py-2 mt-15 mb-10 border border-border rounded-lg ">
          <MarkdownRenderer content={value} />
        </div>
      )}
    </div>
  );
}
