import { FC, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export interface WrapInfoProps {
  title: string;
  content: string;
}

export const WrapInfo: FC<WrapInfoProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-between h-72 border-t border-eae9f0">
        <div
          className=" ml-12 text-[17px] text-494853 font-medium cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </div>
        {isOpen ? (
          <ChevronUpIcon
            className="w-20 h-20 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <ChevronDownIcon
            className="w-20 h-20 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      {isOpen && (
        <div className="ml-24 text-gray-500 text-14 pb-24">{content}</div>
      )}
    </div>
  );
};