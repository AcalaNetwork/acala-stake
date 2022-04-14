import { FixedPointNumber } from "@acala-network/sdk-core";
import { Switch } from "@headlessui/react";
import { ExchangeRate } from "../../../components/ExchangeRate";
import {
  BalanceInput,
  FormPanel,
  TokenSelector,
} from "../../../components/form";
import { RadioGroup } from "../../../components/form/RadioGroup";
import { FormatBalance } from "../../../components/FormatBalance";
import { TxButton } from "../../../components/TxButton";
import { useAddLiquidityCall } from "../../../sdk/hooks/liquidity/useAddLiquidityCall";
import { formatBalance } from "../../../utils/formatBalance";
import {
  LIQUIDITY_MODE,
  useAddLiquidityForm,
} from "../hooks/useAddLiquidityForm";
import { SlippagePopover } from "./SlippagePopover";

export const AddLiquidityTab = () => {
  const [
    selected,
    token1,
    token2,
    tokenList,
    liquidityMode,
    token1Value,
    token2Value,
    suggestToken1Max,
    suggestToken2Max,
    autoStake,
    amounts,
    incrementShare,
    totalShare,
    slippage,
    radioOptions,
    params,
    message,
    err,
    setMode,
    setSelected,
    onInputChange,
    setAutoStake,
    handleAddLiquidityClick,
    onTokenMax,
    setSlippage,
  ] = useAddLiquidityForm();

  const [call, fee] = useAddLiquidityCall(params);

  return (
    <div>
      <TokenSelector
        className="relative h-56 bg-f1f0f2 border border-eae9f0 rounded-8"
        tokenSize={32}
        placeholder="Please Select the Pair"
        tokens={tokenList}
        value={selected}
        onChange={(e) => setSelected(e)}
      />
      {selected && (
        <RadioGroup
          options={radioOptions}
          value={liquidityMode}
          onChange={setMode}
          className="flex flex-between w-full mt-11"
        />
      )}
      {selected && liquidityMode != LIQUIDITY_MODE.MODE_TOKEN2 && (
        <FormPanel
          className="mt-32"
          label={
            <div className="flex flex-between text-13 leading-16 text-grey-3 font-medium">
              <div>Amount</div>
              <div className="text-14 flex">
                Avaliable:{" "}
                <FormatBalance
                  balance={suggestToken1Max}
                  className="text-2e2d33 ml-8"
                />
              </div>
            </div>
          }
        >
          <BalanceInput
            onChange={(e) => onInputChange(1, {token: token1, amount: e})}
            value={token1Value.amount.toString()}
            currency={token1}
            onMax={onTokenMax}
          />
        </FormPanel>
      )}
      {selected && liquidityMode != LIQUIDITY_MODE.MODE_TOKEN1 && (
        <FormPanel
          className="mt-32"
          label={
            <div className="flex flex-between text-13 leading-16 text-grey-3 font-medium">
              <div>Amount</div>
              <div className="text-14 flex">
                Avaliable:{" "}
                <FormatBalance
                  balance={suggestToken2Max}
                  className="text-2e2d33 ml-8"
                />
              </div>
            </div>
          }
        >
          <BalanceInput
            onChange={(e) => onInputChange(2, {token: token2, amount: e})}
            value={token2Value.amount.toString()}
            currency={token2}
            onMax={onTokenMax}
          />
        </FormPanel>
      )}
      <TxButton
        className="w-full h-48 text-16 font-medium mt-32"
        call={call}
        onSuccess={handleAddLiquidityClick}
        message={message}
        error={err || ""}
      >
        Add Liquidity
      </TxButton>
      {selected && (
        <div className="mt-32">
          <div className="flex items-center justify-end">
            <span className="text-14 font-medium mr-12">Staking APY：30%</span>
            <Switch
              checked={autoStake}
              onChange={setAutoStake}
              className={`${
                autoStake ? "bg-primary" : "bg-gray-200"
              } relative inline-flex items-center h-24 rounded-full w-48 ease-in-out duration-[200ms]`}
            >
              <span
                className={`${
                  autoStake ? "translate-x-[25px]" : "translate-x-1"
                } inline-block w-22 h-22 transform bg-white rounded-full ease-in-out duration-[200ms]`}
              />
            </Switch>
          </div>
          <div className="mt-32 border border-eae9f0 rounded-8 p-18 text-14 leading-17 text-494853">
            <FormPanel
              className="flex flex-between mb-8 mt-16"
              label={"Exchange rate"}
            >
              <ExchangeRate
                className="mb-8 font-medium"
                token1={token1}
                token2={token2}
                balance1={amounts[0]}
                balance2={amounts[1]}
              />
            </FormPanel>
            <FormPanel
              className="flex flex-between mb-8"
              label={"Flexible Fee"}
            >
              <div className="font-medium mb-8">{formatBalance(fee)} ACA</div>
            </FormPanel>
            <FormPanel
              className="flex flex-between mb-8"
              label={"You will receive LP Share"}
            >
              <div className="font-medium mb-8">
                {incrementShare.toNumber().toFixed(2)}
              </div>
            </FormPanel>
            <FormPanel
              className="flex flex-between mb-8"
              label={"Share of the pool"}
            >
              <div className="font-medium mb-8">
                {formatBalance(
                  incrementShare
                    .div(totalShare)
                    .times(new FixedPointNumber(100))
                )}
                %
              </div>
            </FormPanel>
            <FormPanel className="flex flex-between mb-8" label={"Slippage"}>
              <div className="font-medium flex flex-center">
                <div>{formatBalance(slippage * 100)}%</div>
                <SlippagePopover
                  data={slippage}
                  onChange={(e) => setSlippage(e)}
                />
              </div>
            </FormPanel>
          </div>
        </div>
      )}
    </div>
  );
};
