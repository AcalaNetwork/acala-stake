import CopyIcon from '/public/icons/copy.svg';
import React, { FC, memo, ReactNode, useCallback, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

interface CopyProps {
  children?: ReactNode;
  className?: string;
  text: string;
  displayText?: string;
  successText?: string;
  copyIcon?: boolean;
  textSelector?: string;
}

export const Copy: FC<CopyProps> = memo(({ children, className, copyIcon = false,
  displayText,
  successText,
  text,
  textSelector }: CopyProps) => {
  const ref = useRef<HTMLDivElement | null>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const originTextRef = useRef<string>();
  const [isCopied, setIsCopied] = useState(false);
  const isCustomTextDOM = !!textSelector;

  const handleCopy = useCallback(() => {
    const $instance = ref.current;
    let originWidth = 0;

    if (isCustomTextDOM && $instance && successText && textSelector) {
      const $target = $instance.querySelector(textSelector) as HTMLElement;

      if ($target) {
        // save originText when originTextRef is empty
        if (!originTextRef.current) {
          originTextRef.current = $target.innerHTML;
        }

        originWidth = $target.getBoundingClientRect().width;

        $target.style.width = `${originWidth}px`;
        $target.innerHTML = successText;
      }
    } else {
      setIsCopied(true);
    }

    // clear old timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      if (isCustomTextDOM && $instance && textSelector) {
        const $target = $instance.querySelector(textSelector);

        if ($target) {
          $target.innerHTML = originTextRef.current || '';
        }
      } else {
        setIsCopied(false);
      }
    }, 2000);
  }, [isCustomTextDOM, textSelector, successText]);

  return (
    <CopyToClipboard
      onCopy={handleCopy}
      text={text}
    >
      <div
        className={`flex flex-center cursor-pointer ${className}`}
        ref={(instance) => { ref.current = instance; }}
      >
        {(isCopied && !isCustomTextDOM) ? successText || displayText || children : displayText || children}
        { copyIcon ? <CopyIcon /> : null }
      </div>
    </CopyToClipboard>
  );
});

Copy.displayName = 'Copy';
