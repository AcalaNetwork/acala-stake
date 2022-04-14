import Link from "next/link";
import { FC, useContext } from "react";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Spacing } from "@components/Spacing";
import { StakeProviderContext } from "./StakeContext";

export const CrossChainConnect = () => {
  const { setStep, connect, setPrePage, activeToken } = useContext(StakeProviderContext);
  return (
    <Card
      variant="border"
      className="py-40 w-[630px] mx-auto px-56 text-494853"
    >
      <div className="flex flex-between text-16 leading-20 font-medium">
        <div>DOT Balance on Acala (Available to Stake)</div>
        <div> - DOT</div>
      </div>
      <Spacing h={26} />
      <div className="flex flex-between text-16 leading-20">
        <div>DOT Balance on Polkadot</div>
        <div> - DOT</div>
      </div>
      <Spacing h={57} />
      {connect ? (
        <div className="flex gap-30 text-16">
          <Button
            className="flex-1 h-48"
            size="sm"
            onClick={() => {
              setStep("wallet-create");
              setPrePage("wallet-confirm");
            }}
          >
            Bring {activeToken} to Acala
          </Button>
          <Button
            className="flex-1 h-48"
            size="sm"
            variant="outline"
            onClick={() => {
              setStep("stake-create");
              setPrePage("wallet-overview");
            }}
          >
            Stake
          </Button>
        </div>
      ) : (
        <div className="flex flex-center flex-col">
          <Button className="w-full h-48 text-16" size="sm">
            Connect Wallet
          </Button>
          <Spacing h={16} />
          <div className="text-14 leading-17 font-medium text-grey-3">
            Remo more on wallet guide{" "}
            <Link href="http://www.google.com">
              <span className="text-primary border-b border-primary cursor-pointer">
                Here
              </span>
            </Link>
            .
          </div>
        </div>
      )}
    </Card>
  );
};
