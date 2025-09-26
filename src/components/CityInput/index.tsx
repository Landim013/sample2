// AI Assist: componente CityInput com debounce interno (sem hook)
import React, { useRef, useState } from "react";

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
    <div style={{ width, maxWidth: 420, margin: "0 auto" }}>
      <input
        value={value}
        defaultValue={value}
        onChange={handleChange}
        placeholder="Digite a cidade..."
        style={{
          padding: 10,
          width: width,
          borderRadius: 8,
          background: "#121114",
          color: "#EAEAEA",
          border: "1px solid #3d3c3c",
        }}
      />

      {open && options.length > 0 && (
        <ul
          style={{
            marginTop: 6,
            padding: 0,
            borderRadius: 8,
            background: "#121114",
          }}
        >
          {options.map((o) => (
            <li key={o.id} style={{ listStyle: "none" }}>
              <button
                onClick={() => handleSelect(o.id, o.city)}
                style={{
                  width: width,
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  padding: 8,
                  cursor: "pointer",
                  color: "#EAEAEA",
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
