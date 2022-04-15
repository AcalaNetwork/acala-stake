import { useCallback, useEffect, useRef, useState } from "react"
import { useMemoized } from ".";

interface UseInputConfigs<T> {
  init?: T;
  validator?: (value: T) => Promise<boolean>;
  rules?: {
    type: 'number' | 'string',
    min: number;
    max: number;
  }
}

export const useInput = <T>(configs: UseInputConfigs<T>) => {
  const [value, setValue] = useState<T>(configs?.init);
  const [error, setError] = useState<string>();
  const valueRef = useRef<T>(configs.init);

  const onChange = useCallback((value: T) => {
    const { rules } = configs;

    if (rules && rules.type === 'number' && Reflect.has(rules, 'max')) {
      if (Number(value) >= configs.rules.max) {
        value = configs.rules.max as unknown as  T;
      }
    }

    if (rules && rules.type === 'number' && Reflect.has(rules, 'min')) {
      if (Number(value) <= configs.rules.min) {
        value = configs.rules.min as unknown as T;
      }
    }

    valueRef.current = value;
    setValue(value);
  }, [configs]);

  const onMax = useCallback((value: T) => {
    onChange(value);
  }, [onChange]);

  useEffect(() => {
    if (configs?.validator) {
      configs.validator(value).then((result: boolean) => {
        result && setError(undefined);
      }).catch((e) => {
        setError(e?.message || e.toString());
      });
    }
  }, [value, configs?.validator, configs]);


  return [value, { onChange, onMax, error, ref: valueRef }] as const;
};
