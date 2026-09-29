import  Errors  from '@/utils/Error';
import { useState } from "react";

export function useErrors() {
  const [version, setVersion] = useState(0);
  const [errors] = useState(() => new Errors());

  const record = (issues: unknown[]) => {
    errors.record(issues);
    setVersion((v) => v + 1);
  };

  const clear = (key: string) => {
    errors.clear(key);
    setVersion((v) => v + 1);
  };

  const reset = () => {
    errors.reset();
    setVersion((v) => v + 1);
  };

  return {
    get: (key: string) => errors.get(key),
    record,
    clear,
    reset,
  };
}
