import { FixedPointNumber } from "@acala-network/sdk-core";
import { BalanceChangedStatus } from "@acala-network/sdk/cross-chain/types";
import { Button, LinkButton, Loading } from "@components";
import { useSubscription } from "@hooks";
import { useCrossChainBalanceChanged } from "@sdk/hooks/crosschain";
import { useCallback, useMemo, useState } from "react";
import { memo } from "react";
import { useBridge } from "../hooks/useBridger";
import { BridgeSteps } from "../types";
import SuccessIcon from '/public/images/result-success.svg';

export const BridgeComplated = memo(() => {
  const {
    token,
    setStep,
    onComplated,
    bridgeAmountInput,
    bridgeRouter,
    bridgeDestAddress,
    hash,
    network
  } = useBridge();

  const extrinsicLink = useMemo(() => `https://${network === 'acala' ? 'polkadot': 'kusama'}.subscan.io/extrinsic/${hash}`, [hash, network]);

  const subscribeBalanceChanged = useCrossChainBalanceChanged(bridgeRouter.toChain);
  const [status, setStatus] = useState<BalanceChangedStatus>(BalanceChangedStatus.CHECKING);

  useSubscription(() => {
    if (
      !bridgeDestAddress?.value ||
      !bridgeAmountInput[0]
    ) return;

    return subscribeBalanceChanged({
      token: token.symbol,
      address: bridgeDestAddress.value,
      amount: new FixedPointNumber(bridgeAmountInput[0].value, token.decimals),
    }).subscribe({
      next: setStatus,
      error: (e) => console.error(e)
    });
  }, [subscribeBalanceChanged, bridgeDestAddress, token]);

  const handleClick = useCallback(() => {
    bridgeAmountInput[0].onReset();

    if (onComplated) {
      onComplated();
    } else {
      setStep(BridgeSteps.FORM);
    }
  }, [bridgeAmountInput, onComplated, setStep]);

  return (
    <div className="flex flex-col items-center">
      <SuccessIcon />
      <div className="mt-34" />
      <div className="text-grey-2 text-24 leading-24">
        {status === BalanceChangedStatus.CHECKING && (
          <div className="flex items-center">
            <Loading className='mr-4' size='xs'
              width={2} />
            <p>Checking Transaction...</p>
          </div>
        )}
        {status === BalanceChangedStatus.SUCCESS && 'Transaction Completed!'}
        {status === BalanceChangedStatus.TIMEOUT && 'Transaction Completed!'}
      </div>
      <LinkButton color='primary' variant='text'>
        <a href={extrinsicLink} rel="noreferrer"
          target={'_blank'}>View Transaction</a>
      </LinkButton>
      <Button className='mt-44 w-[200px]' color="primary"
        onClick={handleClick}>
        Done
      </Button>
    </div>
  );
});
