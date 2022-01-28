import React from "react";
import { FlexibleFeeModal } from "../../modals/FlexibleFee";
import { useOpenModal } from "../../state";
import { ModalType } from "../../state/application/types";
import { Popover } from "../Popover";
import SettingIcon from "/public/icons/setting.svg";

export const Setting = () => {
  const openModal = useOpenModal(ModalType.flexibleFee);
  return (
    <Popover
      location="down"
      content={
        <div className="cursor-pointer w-[200px] text-14">
          <div className="px-30 py-10 hover:bg-gray-400 hover:text-fff rounded-8 duration-75" onClick={() => openModal()}>Flexible Fee</div>
        </div>
      }
    >
      <SettingIcon />
      <FlexibleFeeModal />
    </Popover>
  );
};
