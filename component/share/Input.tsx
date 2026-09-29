import { InputProps } from "@/type/contact/contactUs";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
  onChange,
  name,
  error,
  value,
  options = [],
}: InputProps) {
  const baseClass =
    "w-full px-4 py-3 rounded-lg bg-(--bg-primary) border border-(--border-secondary) focus:outline-none focus:border-(--border-secondary) text-sm auto-fill";

  return (
    <div className="space-y-2 w-full">
      <label htmlFor={name} className="block text-[12px] sm:text-[16px] text-(--text-primary)">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* TEXTAREA */}
      {type === "textarea" && (
        <textarea
          id={name}
          name={name}
          value={value}
          rows={6}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(
            baseClass,
            "text-(--text-primary) placeholder:text-(--text-muted)"
          )}
        />
      )}

      {type === "select" && (
        <div className="relative group">
          <select
            id={name}
            name={name}
            required={required}
            onChange={onChange}
            className={clsx(
              baseClass,
              "appearance-none pr-12",
              value ? "text-(--text-primary)" : "text-(--text-muted)"
            )}
          >
            {/* PLACEHOLDER */}
            <option value="">{placeholder}</option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-(--text-primary)"
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="
        w-5 h-5 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2
        text-(--text-primary) transition-transform duration-300
        group-focus-within:rotate-180
      "
          />
        </div>
      )}

      {/* INPUT */}
      {type !== "textarea" && type !== "select" && (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(
            baseClass,
            "text-(--text-primary) placeholder:text-(--text-muted)"
          )}
        />
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
