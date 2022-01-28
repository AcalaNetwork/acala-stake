import { useCallback, useState } from 'react';

export const useBoolean = (init = false) => {
  const [value, setValue] = useState<boolean>(init);

  const set = useCallback((value: boolean) => {
    setValue(value);
  }, [setValue]);

  const on = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const off = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  return [value, toggle, on, off, set] as const;
};
