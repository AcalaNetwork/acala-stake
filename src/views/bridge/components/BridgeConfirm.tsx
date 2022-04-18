import { FixedPointNumber } from "@acala-network/sdk-core";
import { Button, Card, FormatBalance, List, ListItem, ListLabel, ListValue, TokenImage, TxButton } from "@components";
import { FormatAddress } from "@components/FormatAddress";
import { TokenName } from "@components/TokenName";
import { useCreateCrossChainTx } from "@sdk/hooks/crosschain/useCreateCrossChainTx";
import { formatBalance, getNetworkName, getTokenName } from "@utils";
import { ConnectedNetworks } from "config";
import { useMemo } from "react";
import { useCallback } from "react";
import { memo } from "react";
import { useBridge } from "../hooks/useBridger";
import { BridgeSteps } from "../types";
import { BridgeRouterSelector } from "./BridgeRouterSelector";

export const BridgeConfirm = memo(() => {
  const {
    token,
    setStep,
    bridgeAmountInput,
    bridgeRouter,
    bridgeDestAddress,
  } = useBridge();
  const [amountInputData, amountInputConfigs] = bridgeAmountInput;
  const handlePrev = useCallback(() => {
    setStep(BridgeSteps.FORM);
  }, [setStep]);

  const handleNext = useCallback(() => {
    amountInputData.onReset();
    setStep(BridgeSteps.COMPLATED);
  }, [setStep, amountInputData]);

  const createTx = useCreateCrossChainTx(bridgeRouter.fromChain);

  const params = useMemo(() => {
    return {
      network: bridgeRouter.fromChain as ConnectedNetworks,
      message: `Transfer ${formatBalance(amountInputData.value)} ${getTokenName(token)} from ${getNetworkName(bridgeRouter.fromChain)} to ${getNetworkName(bridgeRouter.toChain)}`,
      call: createTx({
        token: token.symbol,
        to: bridgeRouter.toChain,
        amount: new FixedPointNumber(amountInputData.value, amountInputConfigs.decimals),
        address: bridgeDestAddress.value
      })
    };
  }, [amountInputConfigs.decimals, amountInputData.value, bridgeDestAddress.value, bridgeRouter.fromChain, bridgeRouter.toChain, createTx, token]);


  return (
    <Card className="w-[630px] px-55 py-32" variant="border">
      <div className="border border-primary/20 bg-primary/[.08] py-12 rounded-12 flex flex-col items-center">
        <p className="text-16 leading-27 text-grey-2 font-medium">You will transfer</p>
        <div className="text-32 leading-39 mt-2 font-semibold flex">
          <FormatBalance balance={amountInputData.value} />
          <TokenName token={token} />
        </div>
      </div>
      <BridgeRouterSelector
        className='mt-28'
        {...bridgeRouter}
        disabled={true}
        swap={false}
      />
      <List className="mt-28">
        <ListItem>
          <ListLabel>Asset:</ListLabel>
          <ListValue className="flex gap-4 items-center">
            <TokenImage size={20} token={token} />
            <TokenName token={token} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Destination Account:</ListLabel>
          <ListValue>
            <FormatAddress
              address={bridgeDestAddress.value}
              icon={true}
              name={bridgeDestAddress.name}
              ss58={bridgeDestAddress.ss58}
            />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Destiance CrossChain Fee:</ListLabel>
          <ListValue className="flex items-center gap-4">
            <FormatBalance balance={amountInputConfigs?.destCrossChainFee?.balance} />
            <TokenName token={amountInputConfigs?.destCrossChainFee?.token} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>You will receive::</ListLabel>
          <ListValue className="flex items-center gap-4">
            <TokenImage size={20} token={token} />
            <FormatBalance balance={amountInputConfigs.expectedReceive} />
            <TokenName token={token} />
          </ListValue>
        </ListItem>
      </List>
      <div className='flex gap-22 mt-38'>
        <Button className='flex-1' color='primary'
          onClick={handlePrev}
          variant='outline'
        >
          Back
        </Button>
        <TxButton
          {...params}
          className='flex-1'
          color='primary'
          onSuccess={handleNext}
          variant='filled'
        >
          Next
        </TxButton>
      </div>
    </Card>
  );
});