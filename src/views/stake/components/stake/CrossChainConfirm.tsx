import { FC, useContext } from "react";
import { Card } from "@components/Card";
import { FormPanel } from "@components/form";
import SwapIcon from "/public/pages/bridge/swap-btn.svg";
import { StakeProviderContext } from "./StakeContext";
import { TokenImage } from "@components/TokenImage";
import { TokenName } from "@components/TokenName";
import { Address } from "@components/Address";
import { Button } from "@components/Button";
import { getTokenFullName, getTokenName } from "../../../../utils/token";
import LockIcon from "/public/icons/lock.svg";
import { useActiveAccount } from "../../../../connector";

export const CrossChainConfirm: FC<{ token: "KSM" | "DOT" }> = ({ token }) => {
  const { name, address } = useActiveAccount();
  const { setStep, bridgeAmount, selectToChain, selectFromChain } = useContext(StakeProviderContext);

  return (
    <Card variant="border" className="w-[630px] px-[55px] py-32 mx-auto">
      <div className="w-full flex flex-center flex-col mb-[25px] h-[90px] border border-primary bg-primary border-opacity-20 bg-opacity-[0.08] rounded-[12px] text-494853">
        <p className="text-center mb-2 font-medium text-16 leading-[27px]">
          You Will Transfer
        </p>
        <p className="text-center font-semibold	text-[32px] leading-[39px]">
          {bridgeAmount} {token}
        </p>
      </div>
      <FormPanel className="mb-[28px]">
        <div className="flex flex-center w-full">
          <FormPanel className="flex-1" label={"From"}>
            <div className="h-72 border border-eae9f0 rounded-8">
              <div className="flex flex-between px-10 h-72">
                <TokenImage token={selectFromChain.chainName} />
                <div className="ml-8 leading-20 text-16 font-medium text-494853">
                  {getTokenFullName(selectFromChain?.chainName).toUpperCase()}
                </div>
                <LockIcon className="cursor-pointer" />
              </div>
            </div>
          </FormPanel>
          <div className="flex mx-[18px] mt-[25px]">
            <SwapIcon />
          </div>
          <FormPanel className="flex-1" label={"To"}>
            <div className="h-72 border border-eae9f0 rounded-8">
              <div className="flex flex-between px-10 h-72">
                <TokenImage token={selectToChain.chainName} />
                <div className="ml-8 leading-20 text-16 font-medium text-494853">
                  {getTokenFullName(selectToChain?.chainName).toUpperCase()}
                </div>
                <LockIcon className="cursor-pointer" />
              </div>
            </div>
          </FormPanel>
        </div>
      </FormPanel>
      <FormPanel className="mb-36">
        <div className="w-full text-494853 text-[14px] leading-17px px-[19px] pt-[11px] pb-[10px] border border-d6d3de rounded-8">
          <div className="flex flex-between py-10">
            <div>Asset</div>
            <div className="flex flex-center font-medium">
              <TokenImage token={token} size={20} />
              <TokenName token={token} className="ml-4" />
            </div>
          </div>
          <div className="flex flex-between py-10">
            <div>Destination Account:</div>
            <div className="flex flex-center">
              <Address
                name={name}
                address={address}
                showBoth
                nameClassName="ml-8 text-[12px] text-7b7986 leading-[15px] font-medium"
                addressClassName="ml-2 font-14 leading-17px tracking-[1.6px]"
              />
            </div>
          </div>
          <div className="flex flex-between py-10">
            <div>Network Fee:</div>
            <div className="font-medium">0.2 {token}</div>
          </div>
          <div className="flex flex-between py-10">
            <div>You will receive:</div>
            <div className="flex flex-center">
              <div className="font-medium">{1998.9}{getTokenName(token)}</div>
              <TokenImage className="ml-4" token={token} size={20} />
            </div>
          </div>
        </div>
      </FormPanel>
      <FormPanel>
        <div className="flex gap-20">
          <Button
            size="sm"
            className="flex-1 h-48 font-medium text-16"
            round="lg"
            variant="outline"
            onClick={() => setStep("wallet-create")}
          >
            Back
          </Button>
          <Button
            size="sm"
            className="flex-1 h-48 font-medium text-16"
            round="lg"
            onClick={() => setStep("stake-create")}
          >
            Next
          </Button>
        </div>
      </FormPanel>
    </Card>
  );
};
