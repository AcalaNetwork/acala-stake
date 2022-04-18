import React, { useEffect, useRef, useState } from 'react';
import { SelectorItem } from './form/Selector';

import LockIcon from '/public/icons/lock.svg';
import UnlockIcon from '/public/icons/unlock.svg';
import { CheckIcon } from '@heroicons/react/solid';

interface SearchSelectorProps<T> {
  /** The placeholder value of the input. */
  placeholder?: string;
  /** Custom classes for the component. */
  className?: string;
  /** Whether or not the input is able to be locked. If `true` then it will start locked. */
  lockable?: boolean;
  /**
   * A custom function to determine the search results based off of the input.
   * The filter function passed should take two arguments `value: SearchSelectorItem | string`, and
   * `currentInput: string`. `value` is item in the supplied `data` that is being compared against the current input.
   * The function should return `true` if `value` should be included in the search result, and `false` if not.
   * ```js
   * // Show all data that has the current input within it.
   * const customFilter = (value: string, currentInput: string) => {
   *  if (value.includes(currentInput)) return true;
   *  return false;
   * }
   * ```
   * The default filter used returns data that starts with the input value.
   */
  filter?: (value: SelectorItem<T>, currentInput: string) => boolean;
  /** The initial value of the input. */
  initial?: any;
  /** A state update function that will be called whenever the input field changes or
   * a search result is chosen. */
  onChange?: (value: any) => void;
  /** The searchable items of the component*/
  items: Array<SelectorItem<T>>;
}

/**
 * An input field with searchable items. It can optionally default to a locked state requiring a user
 * to unlock the component before changing the input.
 */
export const SearchSelector: React.FC<SearchSelectorProps<any>> = ({
  placeholder = '',
  className = '',
  lockable,
  filter,
  initial,
  onChange,
  items,
}) => {
  const inputRef = useRef(null);
  const dropDownRef = useRef(null);
  const [showDropDown, setShowDropdown] = useState(false);
  const [searchReults, setSearchResults] = useState(items);
  const [isLocked, setIsLocked] = useState(lockable ?? false);
  const lockRef = useRef(isLocked);

  const updateSearchResults = () => {
    setSearchResults(() =>
      items.filter(
        filter
          ? (item) => filter(item, inputRef.current.value)
          : (item) => {
            const inputRefValueLowerCase = inputRef.current.value.toLowerCase();

            const itemValue = item.value.toLowerCase();

            if (itemValue.startsWith(inputRefValueLowerCase)) return true;
            return false;
          }
      )
    );
  };

  useEffect(() => {
    lockRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    inputRef.current!.value = initial ?? '';

    const onClickOut = (event: Event) => {
      if (lockRef.current) return;
      if (dropDownRef.current && dropDownRef.current.contains(event.target)) {
        return;
      }

      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', onClickOut);

    return () => {
      document.removeEventListener('mousedown', onClickOut);
    };
  }, []);

  return (
    <div className={`relative flex flex-col gap-8 z-20 ${className}`}>
      <div
        className={`group flex flex-row items-center w-full h-58 bg-white rounded-8 border ${
          showDropDown ? 'border-primary focus:border' : ''
        } ${isLocked ? 'cursor-not-allowed' : ''}`}
      >
        <input
          className={`w-full h-58 text-20 pl-22 bg-transparent ${isLocked ? 'cursor-not-allowed' : ''}`}
          disabled={isLocked}
          onChange={() => {
            onChange(inputRef.current.value);
            updateSearchResults();
          }}
          onFocus={() => {
            setShowDropdown(true);
          }}
          placeholder={placeholder}
          ref={inputRef}
          type='text'
        />
        <div
          onClick={() => {
            setShowDropdown(false);
            setIsLocked(!isLocked);
          }}
        >
          {lockable ? (
            isLocked ? (
              <LockIcon className='w-24 h-24 mx-24 cursor-pointer' />
            ) : (
              <UnlockIcon className='w-24 h-24 mx-24 cursor-pointer' />
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {showDropDown ? (
        <div
          className='absolute flex-center flex-col w-full bg-white rounded-8 transform translate-y-[64px] z-10 border p-20 shadow-md'
          ref={dropDownRef}
        >
          {searchReults.length > 0 ? (
            searchReults.map((item, i) => (
              <div
                className='flex flex-row justify-start items-center gap-16 w-full p-8 text-20 hover:bg-gray-100 rounded-8 cursor-pointer self-start'
                key={`search-${i}`}
                onClick={() => {
                  inputRef.current.value = item.value;
                  setShowDropdown(false);
                }}
              >
                {item.value === inputRef.current.value ? item.render(item.value, true) : item.render(item.value, false)}
                {item.value === inputRef.current.value ? (
                  <CheckIcon className='h-[24px] w-[24px] text-primary' />
                ) : (
                  <div />
                )}
              </div>
            ))
          ) : (
            <div className='text-20 m-16'>No Items Found</div>
          )}
        </div>
      ) : (
        <div className='hidden'></div>
      )}
    </div>
  );
};
