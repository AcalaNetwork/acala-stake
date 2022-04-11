import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Spacing } from "@components/Spacing";
import { StakeProviderContext } from "./StakeContext";

import Success from "/public/images/result-success.svg";

export const StakeResult = () => {
  const status = true;
  const {activeToken} = useContext(StakeProviderContext);

  return (
    <>
      <Card
        shadow={"none"}
        className="w-[630px] px-[55px] py-32 mx-auto flex flex-center flex-col"
      >
        <Success />
        <Spacing h={34} />
        <div className="text-24 leading-[24px] font-semibold">
          {!status ? "Waiting for confirmation..." : "Transaction Completed"}
        </div>
        <Spacing h={24} />
        <div className="flex gap-40">
          <Button variant="text" className="pt-0 font-normal">
            See Bridge Transaction
          </Button>
          <Button variant="text" className="pt-0 font-normal">
            See Stake Transaction
          </Button>
        </div>
        {status && (
          <div>
            <Spacing h={40} />
            <Button size="sm" className="h-48 w-[200px]">
              <Link href={`/stake/${activeToken.toLocaleUpperCase()}/mystake`}>My Stakes</Link>
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};
