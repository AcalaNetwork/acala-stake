import {useState, useRef, useEffect } from 'react';

export const useMemoized = <T extends unknown>(value: T): T => {
  const [data, setData] = useState<T>(value);
  const ref = useRef<T>(value);

  useEffect(() => {
    if (JSON.stringify(ref.current) !== JSON.stringify(value)) {
      ref.current = value;
      setData(value);
    }
  }, [value, setData]);

  return data;
};
