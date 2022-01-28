import { Popover } from "@headlessui/react";
import { FC, useCallback, useState } from "react";
import SettingIcon from "/public/icons/setting.svg";

interface PopoverProps {
  data: number;
  onChange: (data: number) => void;
}

export const SlippagePopover: FC<PopoverProps> = ({ data, onChange }) => {
  const [value, setValue] = useState<number>(data);
  
  const handleChange = useCallback((e: number) => {
    setValue(e);
    onChange(e);
  }, [])

  return (
    <Popover className="relative">
      <Popover.Button className="cursor-pointer flex flex-center">
        <SettingIcon className='w-16 h-16 ml-8' />
      </Popover.Button>
      <Popover.Panel className="z-10 absolute px-20 py-18 top-[-50px] left-[-290px] border border-gray-300 bg-gray-200 rounded-16">
        <div>Limit addition price slippage</div>
        <div className="flex-center mt-10">
          <div
            className="flex-center cursor-pointer w-[50px] h-32 border rounded-8 mx-4"
            style={{ borderColor: value == 0.001 ? "var(--color-primary)" : "" }}
            onClick={() => handleChange(0.001)}
          >
            0.1%
          </div>
          <div
            className="flex-center cursor-pointer w-[50px] h-32 border rounded-8 mx-4"
            style={{ borderColor: value == 0.005 ? "var(--color-primary)" : "" }}
            onClick={() => handleChange(0.005)}
          >
            0.5%
          </div>
          <div
            className="flex-center cursor-pointer w-[50px] h-32 border rounded-8 mx-4"
            style={{ borderColor: value == 0.01 ? "var(--color-primary)" : "" }}
            onClick={() => handleChange(0.01)}
          >
            1%
          </div>
          <div className="flex-center cursor-pointer w-[68px] h-32 mx-4">
            <input
              type="number"
              className="pl-0 w-56 text-13 bg-transparent outline-none border-0"
              placeholder="Custom"
              onChange={(e) => handleChange(Number(e.target.value) * 0.01)}
            />
            %
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
