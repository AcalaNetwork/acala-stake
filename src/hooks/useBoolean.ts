import { useRef } from 'react';
import { useCallback, useState } from 'react';

export const useBoolean = (init = false, setFalseDelay = 0) => {
  const [value, setValue] = useState<boolean>(init);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const update = useCallback(
    (value: boolean) => {
      setValue(value);
    },
    [setValue]
  );

  const setTrue = useCallback(() => {
    setValue(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [setValue]);

  const setFalse = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setValue(false);
      timeoutRef.current = null;
    }, setFalseDelay);
  }, [setFalseDelay]);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  return { value, toggle, setTrue, setFalse, update };
};
