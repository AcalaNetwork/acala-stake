import { FC, useContext } from "react";
import { Card } from "../../../../components/Card";
import { FormPanel } from "../../../../components/form";
import { StakeProviderContext } from "./StakeContext";
import { Button } from "../../../../components/Button";
import { FormatBalance } from "../../../../components/FormatBalance";
import { ListItem, ListLabel, ListValue } from "../../../../components/List";
import { Spacing } from "../../../../components/Spacing";
import { useStakeCall } from "../../../../sdk/hooks/stake/useStakeCall";
import { TxButton } from "../../../../components/TxButton";

export const StakeConfirm: FC = () => {
  const { setStep, mintAmount, stakingToken, liquidToken, params } =
    useContext(StakeProviderContext);
  const [call, fee] = useStakeCall(params);

  return (
    <Card variant="border" className="w-[630px] px-[48px] pt-36 pb-38 mx-auto">
      <div className="w-full mb-[38px] text-494853">
        <p className="text-center my-10 font-medium text-28 leading-[27px]">
          Confirm Transaction
        </p>
      </div>
      <FormPanel>
        <ListItem>
          <ListLabel>Bridge Amount Amount</ListLabel>
          <ListValue>2000 DOT</ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Available Amount</ListLabel>
          <ListValue>
            <FormatBalance token={stakingToken} balance={mintAmount?.pay} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Total Stake</ListLabel>
          <ListValue>
            <FormatBalance token={stakingToken} balance={mintAmount?.pay} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>You get </ListLabel>
          <ListValue>
            <FormatBalance token={liquidToken} balance={mintAmount?.receive} />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Transaction Fees</ListLabel>
          <ListValue>
            <FormatBalance balance={fee} token={"KAR"} />
          </ListValue>
        </ListItem>
      </FormPanel>
      <Spacing h={40} />
      <FormPanel>
        <div className="flex gap-20">
          <Button
            size="sm"
            className="flex-1 h-48 font-medium mt-1"
            round="lg"
            variant="outline"
            onClick={() => setStep("stake-create")}
          >
            Back
          </Button>
          <TxButton
            className="flex-1 h-48 text-14 font-normal mt-1"
            onSuccess={() => setStep("stake-result")}
            call={call}
          >
            Confirm
          </TxButton>
        </div>
      </FormPanel>
    </Card>
  );
};
