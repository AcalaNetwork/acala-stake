import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';
import { useMemoized } from './useMemoized';

type StringRuleConfigs = {
  type: 'string',
  required?: boolean;
  maxLength?: number,
  minLength?: number,
  test?: yup.TestConfig<string, AnyObject>;
  errors?: {
    maxLength?: string;
    minLength?: string;
    required?: string;
  },
}

type NumberRuleConfigs = {
  type: 'number',
  required?: boolean;
  max?: number,
  min?: number,
  test?: yup.TestConfig<number, AnyObject>;
  errors?: {
    required?: string;
    max?: string
    min?: string
  },
}

type RuleConfigs = StringRuleConfigs | NumberRuleConfigs;

interface UseInputConfigs {
  type: 'string' | 'number';
  init?: string | number;
  rules?: RuleConfigs[];
}

const createStringSchema = (configs: StringRuleConfigs) => {
  let schema = yup.string();

  if (configs.required) {
    schema = schema.required(configs?.errors?.required);
  }

  if (configs?.minLength !== undefined) {
    schema = schema.min(configs.minLength, configs?.errors?.minLength);
  }

  if (configs?.maxLength !== undefined) {
    schema = schema.max(configs.maxLength, configs?.errors?.maxLength);
  }

  if (configs?.test !== undefined) {
    schema = schema.test(configs.test);
  }

  return schema;
};

const createNumberSchema = (configs: NumberRuleConfigs) => {
  let schema = yup.number();

  if (configs.required) {
    schema = schema.required(configs?.errors?.required);
  }

  if (configs?.min !== undefined) {
    schema = schema.min(configs.min, configs?.errors?.min);
  }

  if (configs?.max !== undefined) {
    schema = schema.max(configs.max, configs?.errors?.max);
  }

  if (configs?.test !== undefined) {
    schema = schema.test(configs.test);
  }

  return schema;
};

export const useInput = (originConfigs: UseInputConfigs) => {
  const changed = useRef<boolean>(false);
  const configs = useMemoized(originConfigs);
  const init = configs.init;
  const [value, setValue] = useState<string | number>(init);
  const [error, setError] = useState<string>();
  const valueRef = useRef<string | number>(init);

  const validate = useCallback(async (value: string): Promise<boolean> => {
    try {
      const rules = configs.rules;

      if (!rules || rules.length === 0) return Promise.resolve(true);

      for (const item of rules) {
        const { type  } = item;

        if (type === 'number') {
          await createNumberSchema(item).validate(Number(value));
        }

        if (type === 'string') {
          await createStringSchema(item).validate(value);
        }
      }

      // clear error messages when no error occured.
      setError('');

      return Promise.resolve(true);
    } catch (e) {
      setError(e.message || e);

      return Promise.reject(e.message || e);
    }

  }, [configs]);

  const onChange = useCallback(
    (value: string) => {
      valueRef.current = value;
      changed.current = true;

      setValue(value);
      validate(value);
    },
    [validate]
  );

  const onMax = useCallback(
    () => {
      const { rules } = configs;

      // find number configs
      const numConfigs = rules.find(i => i.type === 'number');

      if (numConfigs && numConfigs['max']) {
        onChange(numConfigs['max']);
      }
    },
    [configs, onChange]
  );

  const onReset = useCallback(() => {
    setError('');
    setValue(configs.init ?? undefined);
  }, [setError, setValue, configs]);

  const onValidate = useCallback(() => {
    return validate(valueRef.current?.toString() || (configs.type === 'number' ? '0' : ''));
  }, [configs.type, validate]);

  useEffect(() => {
    changed.current && onValidate();
  }, [configs, onValidate]);

  return useMemo(() => ({
    value,
    error,
    ref: valueRef,
    onChange,
    onMax,
    onReset,
    onValidate
  }), [error, onChange, onMax, onReset, onValidate, value]);
};
