import Link from "next/link";
import { memo, useMemo } from "react";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { useStake } from "./StakeProvider";

import Success from "/public/images/result-success.svg";

export const StakeComplated = memo(() => {
  const { network, hash } = useStake();

  const extrinsicLink = useMemo(() => `https://${network === 'acala' ? 'acala': 'karura'}.subscan.io/extrinsic/${hash}`, [hash, network]);

  return (
    <>
      <Card
        className="w-[630px] px-55 py-32 mx-auto flex flex-center flex-col"
        shadow={"none"}
      >
        <Success />
        <div className="mt-34 text-24 leading-24 font-semibold">
          Transaction Completed
        </div>
        <div className="flex gap-40 mt-24">
          <Button className="pt-0 font-normal" variant="text">
            <a href={extrinsicLink} rel="noreferrer"
              target={'_blank'}>View Transaction</a>
          </Button>
        </div>
        <div className="mt-40">
          <Button className="h-48 w-[200px]" size="sm">
            <Link href={`/stake/${network}/user`}>My Stakes</Link>
          </Button>
        </div>
      </Card>
    </>
  );
});
