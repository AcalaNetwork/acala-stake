import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";

export const Dropdown: FC<{
  content: string | ReactNode;
  childItems: (string | ReactNode)[];
  className?: string;
}> = ({ content, childItems, className }) => {
  return (
    <div className={className}>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button>{content}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-8 translate-x-[-30%] bg-white p-8  rounded-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {childItems.map((Node) => (
              <div>{Node}</div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
