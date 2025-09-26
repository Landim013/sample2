import React, { useRef, useState } from "react";
import styles from "./index.module.css";
type Option = { id: string; city: string; country: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  onSelect: (id: string, label: string) => void;
  delay?: number; // tempo do debounce (ms)
  width?: string;
};

export default function CityInput({
  value,
  onChange,
  options,
  onSelect,
  delay = 100,
  width = "100%",
}: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, delay);
    setOpen(newValue.trim().length >= 2);
  }

  function handleSelect(id: string, label: string) {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    onChange(label);
    onSelect(id, label);
    setOpen(false);
  }
  return (
    <div className={styles.container} style={{ width: width }}>
      <input
        className={styles.input}
        value={value}
        defaultValue={value}
        onChange={handleChange}
        placeholder="Digite a cidade..."
        style={{
          width: width,
        }}
      />

      {open && options.length > 0 && (
        <ul className={styles.ul}>
          {options.map((o) => (
            <li key={o.id} style={{ listStyle: "none" }}>
              <button
                className={styles.button}
                onClick={() => handleSelect(o.id, o.city)}
                style={{
                  width: width,
                }}
              >
                {o.city} — {o.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
