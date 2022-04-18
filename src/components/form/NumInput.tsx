import React, { FC, memo, useCallback } from 'react';
import styled from 'styled-components';

export interface NumInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

export const NumInput: FC<NumInputProps> = memo(({ value, onChange, className, placeholder, ...rest }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();

      // update user input if the value is validated or empty
      if (onChange && (value === '' || inputRegex.test(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <StyledInput
      {...rest}
      autoComplete='off'
      autoCorrect='off'
      className={className}
      inputMode='decimal'
      minLength={1}
      onChange={handleChange}
      pattern='^[0-9]*[.]?[0-9]*$'
      placeholder={placeholder || '0.0'}
      spellCheck='false'
      type='text'
      value={(value === 'NaN' ? '' : value) || ''}
    />
  );
});

// clear input default
const StyledInput = styled.input`
  border: none !important;
  apperance: none !important;
  box-shadow: none !important;
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  background: transparent;
  flex: 1;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  padding-left: 24px;

  &:placeholder {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: #7b7986;
  }

  // clear [type=search] style
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`;
