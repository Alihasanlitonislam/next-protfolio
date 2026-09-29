"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SelectDropdownProps<T extends string> {
  label: string;
  name: string;
  value: T;
  options: T[];
  active: boolean;
  setActive: (name: string | null) => void;
  onChange: (value: T) => void;
  error?: string;
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.16, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};

export default function SelectDropdown<T extends string>({
  label,
  name,
  value,
  options,
  active,
  setActive,
  onChange,
  error,
}: SelectDropdownProps<T>) {
  return (
    <div>
      <label className="block pb-2 text-sm font-medium text-(--text-primary)">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setActive(active ? null : name)}
          className="flex w-full items-center justify-between rounded-2xl border border-(--border-secondary) bg-(--bg-primary)/80 px-4 py-3.5 text-left text-sm text-(--text-primary) transition-all duration-200 hover:border-(--border-primary)/70 hover:bg-(--bg-primary)"
        >
          {value}
          <ChevronDown
            className={`h-4 w-4 text-(--text-tertiary) transition-transform duration-200 ${
              active ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {active && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border border-(--border-secondary) bg-(--bg-secondary) shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden"
            >
              <div className="grid">
                {options.map((option) => (
                  <span
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setActive(null);
                    }}
                    className="cursor-pointer px-3 py-2 text-sm text-(--text-primary) transition-all duration-150 hover:bg-(--bg-primary)"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="pt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
