import { BaseComponentProps, FormErrorMessage, InfoBox } from "@components";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { memo } from "react";
import { Card } from "@components/Card";
import {
  BalanceInput,
  FormPanel,
  Switch,
  FormatBalance,
  List,
  ListItem,
  ListLabel,
  ListValue,
  Popover,
  Spacing,
  TxButton,
} from "@components";
import { SDKNetwork } from "@sdk/types";
import { useHomaConts } from "@sdk/hooks/homa";
import { useUnstakeForm } from "../../hook/useUnstakeForm";
import { useUnstakeOverview } from "@views/stake/hook/useUnstakeOverview";
import { formatBalance, getNetworkName, getTokenName } from "@utils";
import { TokenName } from "@components/TokenName";
import { useUnstakeCall } from "@views/stake/hook/useUnstakeCall";

interface UnstakeConsoleProps extends BaseComponentProps {
  network: SDKNetwork
}

export const UnstakeConsole = memo<UnstakeConsoleProps>(({ network }) => {
  const conts = useHomaConts(network);
  const { liquidToken, stakingToken } = conts;
  const {
    amount,
    onAmountChange,
    amountError,
    onMaxAmount,
    maxAmount,
    isFastRedeem,
    setIsFastRedeem
  } = useUnstakeForm(network);
  const { requesting, transferable } = useUnstakeOverview(network);
  const {
    receive,
    fee,
    unstakeFee,
    call
  } = useUnstakeCall({
    network,
    amount,
    isFastRedeem
  });

  return (
    <Card className="pt-40 pb-[111px] w-full"
      variant="border">
      <div className="w-[630px] mx-auto border border-eae9f0 rounded-[24px] px-[55px] py-32">
        {
          requesting?.amount && !requesting.amount.isZero() && (
            <InfoBox className="mb-44">
              <InformationCircleIcon className="h-26 w-26 text-primary mr-18" />
              <div className="flex-1 text-14 leading-20 text-grey-2">
                <div>
                  Queued Unstake Request: 
                  {formatBalance(requesting.amount)}{' '}
                  <TokenName className='text-grey-1'
                    token={liquidToken} />
                </div>
                <div>
                  New Unstake Request will replace currently queued request
                </div>
              </div>
            </InfoBox>
          )
        }
        <FormPanel
          label={
            <div className="text-14 font-medium">
              <div className="flex flex-between">
                <div>Redeem Amount</div>
                <div className="flex flex-center text-grey-2">
                  Available:
                  <div className="text-grey-1 flex ml-8">
                    <FormatBalance balance={maxAmount}
                      human
                    />
                    <TokenName className='ml-4'
                      token={liquidToken}/>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <BalanceInput
            currency={liquidToken}
            onChange={onAmountChange}
            onMax={onMaxAmount}
            value={amount}
          />
          <FormErrorMessage message={amountError} />
        </FormPanel>
        <FormPanel>
          <div className="mt-8 text-14 font-medium text-grey-3">
            <div className="my-6 flex">
              Transferrable:{" "}
              <div className="flex text-grey-2 ml-8">
                <FormatBalance balance={transferable} />
                <TokenName className='ml-4' token={liquidToken} />
              </div>
            </div>
            {/* <div className="my-6 flex text-grey-3">
              Collateral Available to Withdraw:{" "}
              <span className="text-grey-2">

                {liquidToken.name}
              </span>
              <Popover
                content={
                  <div className="p-10 w-[180px]">
                    <div className="text-center text-20 text-333">
                      Collateral Available to Withdraw
                    </div>
                    <Spacing h={20} />
                    <div>
                      LDOT can be used as collateral for Acala Dollar (aUSD).
                      You can withdraw the unused amount of LDOT, that is after
                      the withdraw, the current ratio is greater or equal to the
                      collateral ratio. You can see more details in the Acala
                      Dapp here.
                    </div>
                  </div>
                }
              >
                <InformationCircleIcon className="w-16 h-16 text-[#b1b0bc]" />
              </Popover>
            </div> */}
          </div>
        </FormPanel>
        <FormPanel
          className="mt-40"
          label={
            <div className="flex items-center justify-end">
              <div className="mr-4">Unstake Instantly</div>
              <Switch
                onChange={setIsFastRedeem}
                value={isFastRedeem}
              />
              <Popover
                content={
                  <div className="p-16 w-[280px]">
                    <div className="text-center text-20 font-medium text-grey-1">
                      Unstake Instantly
                    </div>
                    <div className="mt-20 text-16 leading-20 text-grey-2">
                      Unstake Instantly will fastRedeem {getTokenName(stakingToken)} from the toBond
                      pool&apos;s staking queue has enough {getTokenName(stakingToken)} , otherwise it will
                      swap {getTokenName(liquidToken)} to {getTokenName(stakingToken)} with {getNetworkName(network)} Dex Swap. Fees and slippage
                      incurred will be included in the redemption fee.
                    </div>
                  </div>
                }
              >
                <InformationCircleIcon className="w-16 h-16 text-[#b1b0bc]" />
              </Popover>
            </div>
          }
        >
          <div>
            <TxButton
              call={call}
              className="h-48 w-full font-medium"
              network={network}
            >
              Unstake
            </TxButton>
          </div>
        </FormPanel>
        <Spacing h={18} />
        <FormPanel>
          <List>
            <ListItem>
              <ListLabel>You will receive</ListLabel>
              <ListValue className="flex gap-8">
                <FormatBalance balance={receive} />
                <TokenName token={stakingToken} />
              </ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>Redemption Fee</ListLabel>
              <ListValue className="flex gap-8">
                <FormatBalance balance={unstakeFee.amount} />
                <TokenName token={unstakeFee.token} />
              </ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>
                <div className="flex flex-center">
                  Transaction Fee
                </div>
              </ListLabel>
              <ListValue className="flex gap-8">
                <FormatBalance balance={fee.amount} />
                <TokenName token={fee.token} />
              </ListValue>
            </ListItem>
          </List>
        </FormPanel>
      </div>
    </Card>
  );
});
