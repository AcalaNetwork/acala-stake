import { FC, useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ChainSelector, FormPanel } from "../../components/form";
import { TokenImage } from "../../components/TokenImage";
import { TokenName } from "../../components/TokenName";
import SwapIcon from "/public/pages/bridge/swap-btn.svg";
import { Address } from "../../components/Address";
import { BridgeProviderContext } from "./BridgeContext";
import { useOpenModal } from "../../state";
import { ModalType } from "../../state/application/types";

export const ConfirmConsole: FC = () => {
  const { setStep } = useContext(BridgeProviderContext);
  const openConfirmModal = useOpenModal(ModalType.bridgeConfirm);
  const [token, setToken] = useState("DOT");
  const [chain, setChain] = useState({
    chainName: "Acala",
    name: "Acala Network",
    parachainId: 1000,
  });
  const chains = [
    {
      chainName: "Polkadot",
      name: "Polkadot Network",
      parachainId: 10200,
    },
    {
      chainName: "Acala",
      name: "Acala Network",
      parachainId: 10100,
    },
    {
      chainName: "Karura",
      name: "Karura Network",
      parachainId: 1000,
    },
  ];

  return (
    <Card variant="border" className="w-[630px] px-[55px] py-32">
      <div className="w-full mb-[25px] h-92 border border-primary bg-primary border-opacity-20 bg-opacity-[0.08] py-12 rounded-[12px] text-494853">
        <p className="text-center mb-2 font-medium text-16 leading-[27px]">
          You Will Transfer
        </p>
        <p className="text-center font-semibold	text-[32px] leading-[39px]">
          2,000 DOT
        </p>
      </div>
      <FormPanel className="mb-[28px]">
        <div className="flex flex-center w-full">
          <FormPanel className="flex-1" label={"From"}>
            <ChainSelector
              className="relative h-72 border border-eae9f0 rounded-8"
              value={chain}
              chains={chains}
            />
          </FormPanel>
          <div className="flex mx-[18px] mt-[25px]">
            <SwapIcon />
          </div>
          <FormPanel className="flex-1" label={"To"}>
            <ChainSelector
              className="relative h-72 border border-eae9f0 rounded-8"
              value={chain}
              chains={chains}
            />
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
                name="My test account"
                address="5FHsjtkGbHMpW7nhUqT91fju4WzUDz7sL6WSx3tGnTQgjcZW"
                showBoth
                nameClassName="ml-8 text-[12px] text-grey-3 leading-[15px] font-medium"
                addressClassName="ml-2 font-14 leading-17px tracking-[1.6px]"
              />
            </div>
          </div>
          <div className="flex flex-between py-10">
            <div>Network Fee:</div>
            <div className="font-medium">0.2 DOT</div>
          </div>
          <div className="flex flex-between py-10">
            <div>You will receive:</div>
            <div className="flex flex-center">
              <TokenImage token={"DOT"} size={20} />
              <div className="ml-4 font-medium">
                {1998.9}
                {"ACALA"}
              </div>
            </div>
          </div>
        </div>
      </FormPanel>
      <FormPanel>
        <div className="flex flex-between">
          <Button
            size="sm"
            className="w-full h-48"
            round="lg"
            onClick={() => setStep("create")}
          >
            Pre
          </Button>
          <div className="w-8"></div>
          <Button
            size="sm"
            className="w-full h-48"
            round="lg"
            onClick={() => openConfirmModal()}
          >
            Confirm
          </Button>
        </div>
      </FormPanel>
    </Card>
  );
};
