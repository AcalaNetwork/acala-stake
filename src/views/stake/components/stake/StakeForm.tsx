import {
  InformationCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { BalanceInput, FormPanel } from "@components/form";
import { FormatBalance } from "@components/FormatBalance";
import { FormatRatio, Popover, Switch } from "@components";
import { useStake } from "./StakeProvider";
import { TokenName } from "@components/TokenName";
import { memo, useMemo } from "react";
import { useCallback } from "react";
import { StakeSteps } from "@views/stake/types";
import { getTokenName } from "@utils";
import { usePresetTokens } from "@sdk";
import { useAPY } from "@views/stake/hook/useAPY";
import EqualCircleIcon from '/public/icons/equal.svg';
import PlusCircleIcon from '/public/icons/plus.svg';

export const StakeForm = memo(() => {
  const {
    setStep,
    network,
    stakingToken,
    liquidToken,
    stakingInput,
    stakeImmediately
  } = useStake();
  const { inputProps, configs: inputConfigs } = stakingInput;
  const presetTokens = usePresetTokens(network);
  const stableToken = presetTokens?.stableToken;
  const { apy, rewardApy } = useAPY(network, presetTokens.liquidToken);
  const totalApy = useMemo(() => stakeImmediately.value ? apy + rewardApy : apy , [apy, rewardApy, stakeImmediately]);

  const backToCover = useCallback(() => {
    setStep(StakeSteps.COVER);
  }, [setStep]);

  const toConfirm = useCallback(async () => {
    inputProps.onValidate().then(() => {
      setStep(StakeSteps.CONFIRM);
    }).catch(() => {
      // ignore error
    });
  }, [inputProps, setStep]);


  return (
    <Card className="w-[630px] px-55 py-32" variant="border">
      <div className="flex items-center  gap-4 text-grey-3 text-14 leading-17 font-medium cursor-pointer" onClick={backToCover}>
        <ChevronLeftIcon className="w-12 h-12 text-grey-4"/>
        Go Back
      </div>
      <FormPanel
        className="mt-31"
        error={inputProps.error}
        label={
          <div className="flex items-end justify-between text-14 font-medium">
            <p className="text-grey-3">
              Stake & Lock Amount
            </p>
            <div className="flex gap-4">
              <p className="text-grey-1">Available in Wallet:</p>
              <FormatBalance balance={inputConfigs.max} className="text-grey-2"
                human />
              <TokenName token={stakingToken} />
            </div>
          </div>
        }
      >
        <BalanceInput
          onChange={inputProps.onChange}
          onMax={inputProps.onMax}
          value={inputProps.value}
        />
      </FormPanel>
      <div className="mt-8 text-grey-3 font-medium flex gap-4">
        <p>Minimum amount required:</p>
        <span className="flex gap-4  text-grey-2">
          <FormatBalance balance={inputConfigs.min} human />
          <TokenName token={stakingToken} />
        </span>
      </div>
      <div className="flex items-center justify-end mt-16">
        <div>Use {getTokenName(liquidToken)} as Collateral</div>
        <Popover
          content={
            <div className="w-[180px]">
              Stake {getTokenName(liquidToken)} to receive additional Reward APY, stake {getTokenName(liquidToken)} also can be used as collateral to mint {getTokenName(stableToken)}.
            </div>
          }
        >
          <InformationCircleIcon className="w-14 h-14 text-[#b1b0bc]" />
        </Popover>
        <Switch  onChange={stakeImmediately.update} value={stakeImmediately.value} />
      </div>
      <div className="flex justify-center items-center gap-10 mt-16 text-12 font-medium">
        <div className="border border-grey-5 rounded-36 p-10">
          Protocol APY:{' '}
          <span className=" text-acala-blue-600">
            <FormatRatio data={apy} />
          </span>
        </div>
        { stakeImmediately.value && <PlusCircleIcon height={14} width={14} />}
        <div className="border border-grey-5 rounded-36 p-10" style={{opacity: !stakeImmediately.value ? '0.3' : '1'}}>
          Reward APY:{' '}
          <span className=" text-acala-blue-600">
            <FormatRatio data={rewardApy} />
          </span>
        </div>
        <EqualCircleIcon />
        <div className="border border-grey-5 rounded-36 p-10">
          Total APY:{' '}
          <span className=" text-acala-blue-600"><FormatRatio data={totalApy} />
          </span>
        </div>
      </div>
      <Button
        className="h-48 w-full font-medium mt-32"
        onClick={toConfirm}
      >
        Stake
      </Button>
      {/* <Spacing h={20} />
      <List>
        <ListItem>
          <ListLabel>
            <div className="flex flex-center">
                You will receive
              <Popover
                content={
                  <div className="w-[180px]">
                      LDOT represents DOT staked + DOT yield earned
                  </div>
                }
              >
                <InformationCircleIcon className="w-14 h-14 text-[#b1b0bc]" />
              </Popover>
            </div>
          </ListLabel>
          <ListValue>
            <div className="flex flex-center gap-4">
              <FormatBalance balance={mintAmount?.receive} human
                token={liquidToken} />
            </div>
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>Exchange rate</ListLabel>
          <ListValue>
            <ExchangeRate
              balance1={tokenBalance.liquidToken}
              balance2={tokenBalance.stakingToken}
              token1={liquidToken}
              token2={stakingToken}
            />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListLabel>
            <div className="flex flex-center">
                Transaction fee
              <Popover
                content={
                  <div className="w-[180px]">
                      Polkadot transaction fees are paid in DOT. Acala
                      transaction fees can be paid in any available token,
                      please go to Setting to change it.
                  </div>
                }
              >
                <InformationCircleIcon className="w-14 h-14 text-[#b1b0bc]" />
              </Popover>
            </div>
          </ListLabel>
          <ListValue>
            <FormatBalance balance={fee} token={nativeToken} />
          </ListValue>
        </ListItem>
      </List> */}
    </Card>
  );
});
