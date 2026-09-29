
type InputType = "text" | "email" | "password" | "number" | "textarea"| "select";
 
export interface InputProps {
  label: string;
  placeholder?: string;
  type?: InputType;
  required?: boolean;
  name?: string;
  error?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  options?: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface CountryList {
  name: string;
  code: string;
  flag: string;
  dial: string;
  minLength: number;
  maxLength: number;
}