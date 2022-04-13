import { Popover as CPopover, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode, useState } from "react";

export const Popover: FC<{
  content: string | ReactNode;
  className?: string;
  location?: "top" | "down";
}> = ({ children, content, className, location = "top" }) => {
  const position = location === "top" ? {} : {top: "calc(100% + 8px)" };
  const css = location === 'top' ? '-translate-y-full' : '';
  return (
    <CPopover className={`relative flex ${className}`}>
      {({ open }) => (
        <>
          <Transition
            className="absolute mt-1 w-full outline-none z-10 focus:outline-none"
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={open}
            style={position}
          >
            <CPopover.Panel
              className={`absolute z-[999] max-w-7xl px-4 right-0 ${css}`}
            >
              <div className="overflow-hidden rounded-8 shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-7">
                {content}
              </div>
            </CPopover.Panel>
          </Transition>

          <CPopover.Button
            className={`${
              open ? "" : "text-opacity-90"
            } text-white bg-orange-700 px-3 inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            {children}
          </CPopover.Button>
        </>
      )}
    </CPopover>
  );
};
