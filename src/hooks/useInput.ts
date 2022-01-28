import { useCallback, useEffect, useRef, useState } from "react"
import { useMemoized } from ".";

interface UseInputConfigs<T extends unknown> {
  init?: T;
  validator?: (value: T) => Promise<boolean>;
  rules?: {
    type: 'number' | 'string',
    min: number;
    max: number;
  }
};

export const useInput = <T extends unknown>(configs: UseInputConfigs<T>) => {
  const memConfigs = useMemoized(configs);
  const [value, setValue] = useState<T>(configs?.init);
  const [error, setError] = useState<Error>();
  const valueRef = useRef<T>(memConfigs.init);

  const onChange = useCallback((value: T) => {
    const { rules } = memConfigs;

    if (rules.type === 'number' && Reflect.has(rules, 'max')) {
      if (Number(value) >= memConfigs.rules.max) {
        value = memConfigs.rules.max as T;
      }
    }

    if (rules.type === 'number' && Reflect.has(rules, 'min')) {
      if (Number(value) <= memConfigs.rules.min) {
        value = memConfigs.rules.min as T;
      }
    }

    valueRef.current = value;
    setValue(value);
  }, [setValue]);

  const onMax = useCallback((value: T) => {
    onChange(value)
  }, [setValue]);

  useEffect(() => {
    if (memConfigs?.validator) {
      memConfigs.validator(value).then((result: boolean) => {
        result && setError(undefined);
      }).catch((e) => {
        setError(e);
      })
    }
  }, [value, memConfigs?.validator]);


  return [value, { onChange, onMax, error, ref: valueRef }] as const;
}