import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { Switch } from "@headlessui/react";
import {
  InformationCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { BalanceInput, FormPanel } from "@components/form";
import { FormatBalance } from "@components/FormatBalance";
import {
  List,
  ListItem,
  ListLabel,
  ListValue,
} from "@components/List";
import { Popover } from "@components/Popover";
import { Spacing } from "@components/Spacing";
import { ExchangeRate } from "@components/ExchangeRate";
import { useContext } from "react";
import { StakeProviderContext } from "./StakeContext";
import { TokenName } from "@components/TokenName";
import { useStakeCall } from "../../../../sdk/hooks/stake/useStakeCall";
import { FormatRatio } from "@components/FormatRatio";

export const StakeCreate = () => {
  const {
    apy,
    available,
    setStep,
    prePage,
    activeToken,
    liquidToken,
    stakingToken,
    tokenBalance,
    stakeAmount,
    setStakeAmount,
    mintAmount,
    collateralize,
    setCollateralize,
    params,
    nativeToken
  } = useContext(StakeProviderContext);

  const [call, fee] = useStakeCall(params);

  return (
    <Card variant="border" className="w-[630px] px-[55px] py-32 mx-auto">
      <FormPanel className=" text-abaab9 font-medium cursor-pointer">
        <div className="flex items-center" onClick={() => setStep(prePage)}>
          <ChevronLeftIcon className="w-20 h-20" />
          Go Back
        </div>
      </FormPanel>
      <Spacing h={30} />
      <FormPanel
        label={
          <div className="text-14 font-medium">
            <div className="text-right mb-8 text-494853 flex justify-end items-center">
              Available in Wallet:
              <FormatBalance balance={available} human token={activeToken} className="text-2e2d33 font-medium" />
            </div>
            <div className="flex flex-between">
              <span className="text-grey-3">Stake & Lock Amount</span>
              <span className="text-494853">
                Available via Bridge:{" "}
                <span className=" text-2e2d33 font-medium">
                  ***** {activeToken}
                </span>
              </span>
            </div>
          </div>
        }
      >
        <BalanceInput
          currency={Token.fromCurrencyName(activeToken)}
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e)}
        />
        <div className="mt-8 text-grey-3">
          Minimum amount required:{" "}
          <span className=" text-494853 font-medium">1 {activeToken}</span>
        </div>
      </FormPanel>
      <Spacing h={16} />
      <FormPanel
        label={
          <div className="flex items-center justify-end">
            <div>Use LDOT as Collateral</div>
            <Popover
              content={
                <div className="w-[180px]">
                  LDOT received can be automatically used as collateral to
                  borrow aUSD credit. You can withdraw unused LDOT any time.
                </div>
              }
            >
              <InformationCircleIcon className="w-14 h-14 text-[#b1b0bc]" />
            </Popover>
            <Switch
              checked={collateralize}
              onChange={setCollateralize}
              className={`${
                collateralize ? "bg-primary" : "bg-gray-200"
              } relative inline-flex items-center h-18 rounded-full w-36 ease-in-out duration-[200ms]`}
            >
              <span
                className={`${
                  collateralize ? "translate-x-[19px]" : "translate-x-1"
                } inline-block w-16 h-16 transform bg-white rounded-full ease-in-out duration-[200ms]`}
              />
            </Switch>
          </div>
        }
      >
        <div>
          <Button
            size="sm"
            className="h-48 w-full font-medium mt-32"
            round="lg"
            onClick={() => setStep("stake-confirm")}
          >
            Stake
          </Button>
        </div>
      </FormPanel>
      <Spacing h={20} />
      <FormPanel>
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
                <FormatBalance balance={mintAmount?.receive} human token={liquidToken} />
              </div>
            </ListValue>
          </ListItem>
          <ListItem>
            <ListLabel>Exchange rate</ListLabel>
            <ListValue>
              <ExchangeRate
                token1={liquidToken}
                token2={stakingToken}
                balance1={tokenBalance.liquidToken}
                balance2={tokenBalance.stakingToken}
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
        </List>
      </FormPanel>
      <Spacing h={20} />
      <FormPanel
        label={
          <div className="text-18 font-semibold text-black">
            Yield & Rewards
          </div>
        }
      >
        <List>
          <div className="px-20 pb-11">
            <ListItem>
              <ListLabel>
                <div className="flex flex-center">
                  Est. Staking APY
                  <Popover
                    content={
                      <div className="w-[180px]">
                        The APY is adjusted daily based on the on-chain staking
                        rewards, and specific APY displayed is subject to
                        change. This already includes 1% staking fee that will
                        be contributed to the Acala Treasury.
                      </div>
                    }
                  >
                    <InformationCircleIcon className="w-14 h-14 text-[#b1b0bc]" />
                  </Popover>
                </div>
              </ListLabel>
              <ListValue>
                <FormatRatio data={apy} />
              </ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>Est. Yield</ListLabel>
              <ListValue><FormatBalance balance={mintAmount?.pay.times(new FixedPointNumber(apy))} human token={activeToken} /></ListValue>
            </ListItem>
          </div>
          <div className="border border-d6d3de rounded-8 bg-[#eceaf4] px-20 py-11">
            <ListItem>
              <ListLabel>Est. Airdrop APR (Variable)</ListLabel>
              <ListValue>*****</ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>Est. Airdrop Yield</ListLabel>
              <ListValue>****** ACA</ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>Limited time only</ListLabel>
              <ListValue>2022-01-** to 2022-01-**</ListValue>
            </ListItem>
          </div>
        </List>
      </FormPanel>
    </Card>
  );
};
