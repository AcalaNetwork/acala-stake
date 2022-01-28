import { ExchangeRate } from "../../../components/ExchangeRate";
import {
  BalanceInput,
  FormPanel,
  TokenSelector,
} from "../../../components/form";
import { TxButton } from "../../../components/TxButton";
import { useWithdrawLiquidityCall } from "../../../sdk/hooks/liquidity/useWithdrawLiquidityCall";
import { formatBalance } from "../../../utils/formatBalance";
import { formatNumber } from "../../../utils/formatNumber";
import { useWithdrawLiquidityForm } from "../hooks/useWithdrawLiquidityForm";
import { SlippagePopover } from "./SlippagePopover";

export const WithdrawLiquidityTab = () => {
  const [
    selectToken,
    tokenList,
    slelectValue,
    suggestTokenMax,
    amounts,
    slippage,
    params,
    message,
    err,
    setSelectToken,
    onSlelectChange,
    onMax,
    setSlippage,
  ] = useWithdrawLiquidityForm();

  const [call, fee] = useWithdrawLiquidityCall(params);

  return (
    <div>
      <TokenSelector
        className="relative h-56 bg-f1f0f2 border border-eae9f0 rounded-8"
        tokenSize={32}
        placeholder="Please Select a Pair"
        tokens={tokenList}
        value={selectToken}
        onChange={(e) => setSelectToken(e)}
      />
      {selectToken && (
        <div className="mt-32">
          <div className="flex flex-between text-13 leading-16 text-7b7986 font-medium">
            <div>Amount</div>
            <div className="text-14">
              Avaliable:{" "}
              <span className="text-2e2d33">
                {formatBalance(suggestTokenMax)}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <BalanceInput
              max={180}
              value={slelectValue}
              onChange={onSlelectChange}
              currency={{ token: selectToken }}
              onMax={onMax}
            />
          </div>
        </div>
      )}
      <TxButton
        call={call}
        message={message}
        error={err || ""}
        className="w-full h-48 text-16 font-medium mt-32"
      >
        Withdraw Liquidity
      </TxButton>
      {selectToken && (
        <div className="mt-32">
          <div className="mt-32 border border-eae9f0 rounded-8 p-18 text-14 leading-17 text-494853">
            <FormPanel
              className="flex flex-between mb-8 mt-16"
              label={"Exchange rate"}
            >
              <div className="font-medium flex flex-center">
                <ExchangeRate
                  className="mb-8"
                  token1={selectToken.pair[0]}
                  token2={selectToken.pair[1]}
                  balance1={amounts[0]}
                  balance2={amounts[1]}
                />
              </div>
            </FormPanel>
            <FormPanel
              className="flex flex-between mb-8"
              label={"Flexible Fee"}
            >
              <div className="font-medium ">{formatNumber(fee)}ACA</div>
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
