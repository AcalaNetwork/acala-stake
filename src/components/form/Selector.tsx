import { Listbox, Transition } from "@headlessui/react";
import React, { FC, ReactNode, useCallback, useEffect, useMemo } from "react";
import { uniqueId } from "lodash";
import { BaseInputElementProps } from "./BaseInputRoot";

export interface SelectorItem<T> {
	value: T;
	render: (value: T, selected: T) => ReactNode;
	className?: string;
	key?: string;
	disabled?: boolean;
}

interface SelectorProps<T> extends BaseInputElementProps {
	value?: T;
	placeholder?: string;
	onChange?: (value: T) => void;
	items?: SelectorItem<T>[];
	className?: string;
  rootClassName?: string;
	listClassName?: string;
	search?: boolean;
	render?: (value: T) => ReactNode;
	searchRender?: () => ReactNode;
}

export const Selector = React.memo(
	<T,>({
    value,
    onChange,
    onBlur,
    render,
    items,
    rootClassName,
    listClassName,
    placeholder
  }: SelectorProps<T>) => {
	  const uuid = useMemo(() => uniqueId("list-"), []);

	  const handleChange = useCallback((value: T) => {
	    if (onChange) {
	      onChange(value);
	    }
	  }, [onChange]);

	  return (
	    <Listbox onChange={handleChange}
	      value={value}>
	      {({ open }) => (
	        <div className={rootClassName || 'relative'}>
	          <AutoBlur handleBlur={onBlur}
	            open={open} />
	          <Listbox.Button as='div'
	            className='h-full cursor-pointer'>
	            {render ? render(value) : null}
	          </Listbox.Button>
	          <Transition
	            className="absolute mt-1 w-full outline-none left-0 z-10 focus:outline-none"
	            leave="transition ease-in duration-200" 
	            leaveFrom="opacity-100"
	            leaveTo="opacity-0"
	            show={open}
	            style={{ top: "calc(100% + 8px)" }}
	            unmount={false}
	          >
	            <Listbox.Options className={`rounded-8 shadow-lg bg-f1f0f2 px-8 py-14 cursor-pointer z-10 ${listClassName}`}>
	              {items.map((item, i) => (
	                <Listbox.Option
	                  className={item?.className || ""}
	                  disabled={item.disabled}
	                  key={item?.key || uuid + i}
	                  value={item.value}
	                >
	                  {item.render(item.value, value)}
	                </Listbox.Option>
	              ))}
	            </Listbox.Options>
	          </Transition>
	        </div>
	      )}
	    </Listbox>
	  );
	}
);

const AutoBlur: FC<{ open: boolean, handleBlur?: () => void }> = React.memo(({ open, handleBlur}) => {
  useEffect(() => {
    open === false && handleBlur ? handleBlur() : null;
  }, [open, handleBlur]);

  return null;
});