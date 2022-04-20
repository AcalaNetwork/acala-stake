import { FC } from 'react';
import { RadioGroup as Radio } from '@headlessui/react';

export interface RadioOption {
  value: any;
  label: string;
  className?: string;
}

interface RadioGroupProps {
  value: any;
  options: RadioOption[];
  onChange: (value: any) => void;
  className?: string;
}

export const RadioGroup: FC<RadioGroupProps> = ({ options, value, onChange, className }) => {
  return (
    <Radio className={className} onChange={onChange}
      value={value}>
      {options.map((option, index) => (
        <Radio.Option key={index} value={option.value}>
          {({ checked }) => (
            <div className='cursor-pointer flex flex-center'>
              {checked ? (
                <div className='w-16 h-16 border rounded-circle border-primary flex flex-center mr-8'>
                  <div className='w-8 h-8 bg-primary rounded-circle'></div>
                </div>
              ) : (
                <div className='w-16 h-16 border rounded-circle border-grey-5 mr-8'></div>
              )}
              <span className={option.className}>{option.label}</span>
            </div>
          )}
        </Radio.Option>
      ))}
    </Radio>
  );
};
