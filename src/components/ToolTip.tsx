import React, { useState } from "react";
import ToolTipIcon from "/public/icons/tool-tip.svg";

export const ToolTip: React.FC = ({ children }) => {
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="inline-flex">
      <div
        className="flex-center flex-col cursor-pointer"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        <ToolTipIcon />
        <div
          className={`absolute flex flex-row justify-start text-333 items-center px-16 bg-gray-50 border-2 border-eae9f0 w-[330px] min-h-126 mt-32 rounded-8 translate-y-64 ${
            showToolTip ? "" : "hidden"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};