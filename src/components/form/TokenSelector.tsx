import { Token } from "@acala-network/sdk-core";
import { FC, useCallback, useMemo } from "react";
import { useBoolean, useMemoized } from "../../hooks";
import { TokenImage, TokenSize } from "../TokenImage";
import { TokenName } from "../TokenName";
import { Selector } from "./Selector";
import TriangleIcon from "/public/icons/triangle.svg";
import { CheckIcon } from "@heroicons/react/solid";
import { memo } from "react";

interface TokenSelectorProps {
  tokens: Token[];
  value?: Token;
  onChange?: (value: Token) => void;
  tokenSize?: TokenSize;
  className?: string;
  listClassName?: string;
  placeholder?: string;
}

export const TokenSelector: FC<TokenSelectorProps> = memo(({
  tokens,
  value,
  tokenSize,
  onChange,
  className,
  placeholder,
  listClassName,
}) => {
  const memTokens = useMemoized(tokens);
  const { value: focuse, setTrue: onFocuse, setFalse: onBlur } = useBoolean();

  const btnRender = useCallback(
    (value: Token) => {
      return value ? (
        <div className="flex flex-between px-[16px] h-full">
          <div className="flex flex-center">
            <TokenImage size={tokenSize}
              token={value} />
            <TokenName
              className="ml-8 leading-20 text-16 font-medium text-494853"
              token={value}
            />
          </div>
          <TriangleIcon aria-hidden="true" />
        </div>
      ) : placeholder ? (
        <div className="flex flex-between px-[16px] h-full">
          <div className="flex items-center justify-start text-16 leading-20 text-abaab9 font-medium">
            {placeholder}
          </div>
          <TriangleIcon aria-hidden="true" />
        </div>
      ) : null;
    },
    [tokenSize, placeholder]
  );

  const itemRender = useCallback(
    (selected: Token) => {
      return (value: Token) => (
        <div className="py-12 px-8 rounded-8 flex flex-between hover:bg-fff">
          <div className="flex flex-center">
            <TokenImage size="sm"
              token={value} />
            <TokenName
              className="ml-8 font-medium text-16 leading-20 text-grey-3"
              token={value}
            />
          </div>

          {selected && selected.name === value.name && (
            <CheckIcon aria-hidden="true"
              className="h-[20px] w-[20px] text-primary" />
          )}
        </div>
      );
    },
    []
  );

  const items = useMemo(() => {
    return memTokens.map((item) => {
      return {
        value: item,
        render: itemRender(value),
      };
    });
  }, [itemRender, memTokens, value]);

  return (
    <Selector
      items={items}
      listClassName={listClassName}
      onBlur={onBlur}
      onChange={onChange}
      render={btnRender}
      rootClassName={className}
      value={value}
    />
  );
});
