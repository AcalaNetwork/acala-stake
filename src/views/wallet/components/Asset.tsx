import { FC, useCallback, useContext, useState } from "react";
import { Address } from "../../../components/Address";
import { Card } from "../../../components/Card";
import { Copy } from "../../../components/Copy";
import { useActiveAccount } from "../../../connector";
import { useBalanceVisible, useOpenModal, useSetBalanceVisible } from "../../../state";
import { ModalType } from "../../../state/application/types";
import { formatNumber } from "../../../utils/formatNumber";
import { Itotal } from "../hook/useStakesCalculator";
import ChangeIcon from "/public/icons/change.svg";
import CopyIcon from "/public/icons/copy.svg";
import EyeIcon from "/public/icons/eye.svg";
import EyeCloseIcon from "/public/icons/eye-close.svg";
import WalletIcon from "/public/icons/wallet.svg";
import { DisplayContext } from "..";
import { AddressAvatar } from "../../../components/AddressAvatar";

export const Asset: FC<{data: Itotal}> = ({ data }) => {
  const { type } = useContext(DisplayContext);
  const { address, name } = useActiveAccount();
  const openModal = useOpenModal(ModalType.selectAccount);
  const visible = useBalanceVisible();
  const change = useSetBalanceVisible();
  const toggle = useCallback(() => change(!visible), [change, visible]);

  return (
    <div className="flex gap-29 h-[157px]">
      <Card
        variant="border"
        className="pl-32 pr-24 pt-20 flex-1"
        style={{
          backgroundImage: `url("/images/top-board-bg.svg")`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center justify-end cursor-pointer select-none" onClick={toggle}>
          {visible ? <EyeIcon /> : <EyeCloseIcon className='w-16 h-16' />}
          <p className="ml-8 text-abaab9 font-semibold text-[11px] leading-[13px]">
            Hide Balance
          </p>
        </div>
        <div className="flex items-center mt-15">
          <div className="mr-40">
            <WalletIcon />
          </div>
          <div className="flex flex-1 items-center">
            <div className="flex-1">
              <p className="font-medium text-14 leading-17 text-7b7986 mb-12">
                Estimated Portfolio
              </p>
              <div className="text-2e2d33 font-semibold text-[32px] leading-[39px]">
                { visible ? formatNumber(type === 'USD' ? data?.totalValue : data?.totalAmount) : '******'}
              </div>
            </div>
            <div className="flex-1 ml-20">
              <p className="font-medium text-14 leading-17 text-7b7986 mb-12">
                Est. Earning
              </p>
              <div className="text-2e2d33 font-semibold text-[32px] leading-[39px]">
              {visible ? formatNumber(data?.earning) : '******'}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card variant="gradient-border" className="pl-32 pr-44 flex items-center">
        <div className="mr-34">
          <AddressAvatar size={64} address={address} className="w-64 h-64" />
        </div>
        <div>
          <div className="text-333 text-20 leading-24 font-medium max-w-[180px] overflow-hidden overflow-ellipsis">
            {name}
          </div>
          <Address
            address={address}
            className="mt-8 text-14 leading-17"
          />
          <div className="mt-[17px] flex text-13 text-primary cursor-pointer">
            <div className="flex items-center" onClick={() => openModal()}>
              <ChangeIcon />
              <span className="ml-8">Change</span>
            </div>
            <div className="ml-34 flex items-center justify-start">
              <CopyIcon />
              <Copy
                className="ml-8 w-48"
                text={address}
                displayText="Copy"
                successText="Copied"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
