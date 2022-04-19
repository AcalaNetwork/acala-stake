import { memo, useCallback } from "react";
import { Card } from "@components/Card";
import { FormPanel } from "@components/form";
import { Button } from "@components/Button";
import { FormatBalance } from "@components/FormatBalance";
import { ListItem, ListLabel, ListValue } from "@components/List";
import { TxButton } from "@components/TxButton";
import { useStake } from "./StakeProvider";
import { TokenName } from "@components/TokenName";
import { StakeSteps } from "@views/stake/types";
import { useMemo } from "react";
import { formatBalance, getTokenName } from "@utils";

export const StakeConfirm = memo(() => {
  const {
    network,
    stakingToken,
    liquidToken,
    stakingInput,
    callData,
    setStep,
  } = useStake();
  const { inputProps, configs: inputConfigs } = stakingInput;

  const toForm = useCallback(() => {
    setStep(StakeSteps.FORM);
  }, [setStep]);

  const toComplated = useCallback(() => {
    setStep(StakeSteps.COMPLATED);
  }, [setStep]);

  const txMessage = useMemo(() => {
    return `Stake ${formatBalance(inputProps.value)} ${getTokenName(stakingToken)} to Homa`;
  }, [inputProps?.value, stakingToken]);

  return (
    <Card className="w-[630px] px-48 pt-36 pb-38 mx-auto" variant="border">
      <p className="w-full text-grey-1 text-center font-medium text-28 leading-27 mb-35">
        Confirm Transaction
      </p>
      <FormPanel>
        <ListItem>
          <ListLabel>Available Amount</ListLabel>
          <ListValue className="flex items-center gap-4">
            <FormatBalance balance={inputConfigs.max} />
            <TokenName token={stakingToken} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel className="text-grey-2">Total Stake</ListLabel>
          <ListValue className="flex items-center gap-4 font-semibold">
            <FormatBalance balance={inputProps?.value} />
            <TokenName token={stakingToken} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel className="text-grey-2">You get </ListLabel>
          <ListValue className="flex items-center gap-4 font-semibold">
            <FormatBalance balance={callData?.estResult?.receive} />
            <TokenName token={liquidToken} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Transaction Fees</ListLabel>
          <ListValue className="flex items-center gap-4">
            <FormatBalance balance={callData?.callData?.fee?.amount}/>
            <TokenName token={callData?.callData?.fee?.token}/>
          </ListValue>
        </ListItem>
      </FormPanel>
      <div className="flex gap-20 mt-40">
        <Button
          className="flex-1"
          onClick={toForm}
          round="lg"
          size="sm"
          variant="outline"
        >
          Back
        </Button>
        <TxButton
          call={callData?.callData?.call}
          className="flex-1"
          message={txMessage}
          network={network}
          onSuccess={toComplated}
        >
            Confirm
        </TxButton>
      </div>
    </Card>
  );
});
