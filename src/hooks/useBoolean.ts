import { useCallback, useState } from 'react';

export const useBoolean = (init = false) => {
  const [value, setValue] = useState<boolean>(init);

  const update = useCallback((value: boolean) => {
    setValue(value);
  }, [setValue]);

  const setTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const setFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  return { value, toggle, setTrue, setFalse, update };
};
