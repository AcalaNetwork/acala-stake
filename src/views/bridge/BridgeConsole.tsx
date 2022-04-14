import { Token } from "@acala-network/sdk-core";
import React, { FC, useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { FormPanel, ChainSelector } from "../../components/form";
import { NumInput } from "../../components/form/NumInput";
import { TokenSelector } from "../../components/form";
import SwapIcon from "/public/pages/bridge/swap-btn.svg";
import { BridgeProviderContext } from "./BridgeContext";
import LockIcon from "/public/icons/lock.svg";
import { Address } from "../../components/Address";

export const BridgeConsole: FC = () => {
  const { setStep } = useContext(BridgeProviderContext);
  const [token, setToken] = useState(Token.create("LKSM"));
  const [chain, setChain] = useState({
    chainName: "ACA",
    name: "Acala Network",
    parachainId: 1000,
  });
  const tokens = [
    Token.create("DOT"),
    Token.create("LKSM"),
    Token.create("KSM"),
  ];
  const chains = [
    {
      chainName: "DOT",
      name: "Polkadot Network",
      parachainId: 10200,
    },
    {
      chainName: "ACA",
      name: "Acala Network",
      parachainId: 10100,
    },
    {
      chainName: "KSM",
      name: "Karura Network",
      parachainId: 1000,
    },
  ];

  const handleClick = () => {
    setStep("confirm");
  };

  const handleLockClick = () => {
    console.log("handleLockClick");
  };

  return (
    <Card variant="border" className="w-[630px] px-[55px] py-32">
      <FormPanel className="mb-[28px]" label={`Assets`}>
        <div className="h-56">
          <TokenSelector
            className="relative h-56 bg-f1f0f2 border border-eae9f0 rounded-8"
            tokenSize="md"
            value={token}
            tokens={tokens}
          />
        </div>
      </FormPanel>
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
      <FormPanel className="mb-[28px]" label={`Amount`}>
        <div className="bg-f1f0f2 rounded-[8px] text-2e2d33 border focus-within:border-primary">
          <NumInput className="font-4 font-semibold h-[60px] w-full " />
        </div>
      </FormPanel>
      <FormPanel className="mb-[36px]" label={"Destination"}>
        <div className="flex flex-between w-full bg-f1f0f2 h-56 border border-eae9f0 rounded-[12px] p-16">
          <div className="flex flex-center">
            <Address
              name="My test account"
              address="5FHsjtkGbHMpW7nhUqT91fju4WzUDz7sL6WSx3tGnTQgjcZW"
              showBoth
              spaceIcon="-"
              nameClassName="ml-8 mr-4 text-[12px] text-grey-3 leading-15 font-medium"
              addressClassName="ml-4 text-[14px] leading-17px tracking-[1.6px] font-normal"
            />
          </div>
          <LockIcon
            className="cursor-pointer"
            onClick={() => handleLockClick()}
          />
        </div>
      </FormPanel>
      <FormPanel>
        <Button
          size="sm"
          className="w-full h-48 font-medium"
          round="lg"
          onClick={handleClick}
        >
          Next
        </Button>
      </FormPanel>
    </Card>
  );
};