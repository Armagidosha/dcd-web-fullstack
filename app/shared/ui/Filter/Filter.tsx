"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import st from "./Filter.module.scss";

interface FilterProps {
  items: string[];
  onSelect?: (item: string) => void;
}

export default function Filter({ items, onSelect }: FilterProps) {
  const [active, setActive] = useState(items[0] ?? null);

  const handleSelect = (item: string) => {
    setActive(item);
    if (onSelect) onSelect(item);
  };

  const onKeyUp = (evt: KeyboardEvent<HTMLLIElement>, item: string) => {
    if (evt.key === "enter" || evt.key === " ") {
      evt.preventDefault();
      handleSelect(item);
    }
  };

  return (
    <ul className={st.filter_container}>
      {items.map((item) => (
        <li
          key={item}
          className={st.filter_item}
          onClick={() => handleSelect(item)}
          onKeyUp={(evt) => onKeyUp(evt, item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
