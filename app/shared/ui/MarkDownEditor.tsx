"use client";

import { useState } from "react";
import MarkdownRenderer from "./MarkDownRenderer";

interface MarkdownEditorProps {
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="w-full">
      {/* Панель инструментов */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-4 py-2 rounded-t ${
              activeTab === "edit"
                ? "bg-primary text-light-text"
                : "cursor-pointer"
            }`}
          >
            Редактировать
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 rounded-t ${
              activeTab === "preview"
                ? "bg-primary text-light-text"
                : "cursor-pointer"
            }`}
          >
            Предпросмотр
          </button>
        </div>
      </div>

      {/* Контент */}
      {activeTab === "edit" ? (
        <textarea
          required
          autoComplete="off"
          value={value}
          name="description"
          onChange={onChange}
          className="w-full px-4 py-2 border min-h-50 border-border rounded-lg rounded-tl-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          placeholder="Введите текст в формате Markdown..."
        />
      ) : (
        <div className="w-full min-h-50 px-4 py-2 border border-border rounded-lg ">
          <MarkdownRenderer content={value} />
        </div>
      )}
    </div>
  );
}
