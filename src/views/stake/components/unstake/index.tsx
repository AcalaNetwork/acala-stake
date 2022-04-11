import { Token } from "@acala-network/sdk-core";
import { Switch } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { FC, useCallback, useContext } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { BalanceInput, FormPanel } from "../../../../components/form";
import { FormatBalance } from "../../../../components/FormatBalance";
import {
  List,
  ListItem,
  ListLabel,
  ListValue,
} from "../../../../components/List";
import { Popover } from "../../../../components/Popover";
import { Spacing } from "../../../../components/Spacing";
import { TxButton } from "../../../../components/TxButton";
import { useActiveAccount } from "../../../../connector";
import { useOpenModal } from "../../../../state";
import { ModalType } from "../../../../state/application/types";
import { useUnstakeForm } from "../../hook/useUnstakeForm";

export const UnStakeCard: FC<{ token: "KSM" | "DOT" }> = ({ token }) => {
  const { address } = useActiveAccount();
  const [
    staked,
    liquidToken,
    isFast,
    amount,
    redeem,
    nativeToken,
    setIsFast,
    setAmount,
  ] = useUnstakeForm(token, address);
  const [redeemData, redeemReset] = redeem;
  const openModal = useOpenModal(ModalType.unstakeConfirm);
  const handleClick = useCallback(() => {
    openModal();
  }, [openModal]);
  return (
    <Card variant="border" className="pt-40 pb-[111px] container">
      <div className="w-[630px] mx-auto border border-eae9f0 rounded-[24px] px-[55px] py-32">
        <div className="h-60 rounded-[12px] border border-opacity-30 border-primary flex items-center justify-start pl-16 pr-20 mb-44">
          <InformationCircleIcon className="h-26 w-26 text-primary mr-18" />
          <div className="flex-1 text-14 leading-20 text-494853">
            It will take maximum 29 days to redeem staked DOT. You can redeem
            instantly with a fee.
          </div>
        </div>
        <FormPanel
          label={
            <div className="text-14 font-medium">
              <div className="mb-6 text-right">
                Queued Unstake Request:{" "}
                <span className="text-494853">*** DOT</span>
              </div>
              <div className="flex flex-between">
                <div>Redeem Amount</div>
                <div className="flex flex-center">
                  Available:{" "}
                  <span className="text-494853">
                    <FormatBalance balance={staked} human token={liquidToken} />
                  </span>
                  <Popover
                    content={
                      <div className="w-[180px]">
                        Max amount to Unstake Instantly = Free Balance +
                        Available Collateral to Withdraw Max amount for Unstake
                        Request = Free Balance + Available to Withdraw +
                        Unprocessed Unstake Request Amount
                      </div>
                    }
                  >
                    <InformationCircleIcon className="w-16 h-16 text-[#b1b0bc]" />
                  </Popover>
                </div>
              </div>
            </div>
          }
        >
          <BalanceInput
            currency={Token.fromCurrencyName("DOT")}
            value={amount}
            onChange={(e) => setAmount(e)}
          />
        </FormPanel>
        <FormPanel>
          <div className="mt-8 text-14 font-medium text-7b7986">
            <div className="my-6">
              Transferrable:{" "}
              <span className="text-333">**** {liquidToken.name}</span>
            </div>
            <div className="my-6 flex">
              Collateral Available to Withdraw:{" "}
              <span className="text-333">**** {liquidToken.name}</span>
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
            </div>
          </div>
        </FormPanel>
        <Spacing h={40} />
        <FormPanel
          label={
            <div className="flex items-center justify-end">
              <div className="mr-4">Unstake Instantly</div>
              <Switch
                checked={isFast}
                onChange={setIsFast}
                className={`${
                  isFast ? "bg-primary" : "bg-gray-200"
                } relative inline-flex items-center h-18 rounded-full w-36 ease-in-out duration-[200ms]`}
              >
                <span
                  className={`${
                    isFast ? "translate-x-[19px]" : "translate-x-1"
                  } inline-block w-16 h-16 transform bg-white rounded-full ease-in-out duration-[200ms]`}
                />
              </Switch>
              <Popover
                content={
                  <div className="p-10 w-[180px]">
                    <div className="text-center text-20 font-medium text-333">
                      Unstake Instantly
                    </div>
                    <Spacing h={20} />
                    <div>
                      Unstake Instantly will fastRedeem DOT from the toBond
                      pool's staking queue has enough DOT, otherwise it will
                      swap LDOT to DOT with Acala Dex Swap. Fees and slippage
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
              className="h-48 w-full font-medium"
              onSuccess={() => handleClick()}
              call={redeemData.call}
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
              <ListValue>
                <FormatBalance balance={redeemData?.receive} token={token} />
              </ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>Redemption Fee</ListLabel>
              <ListValue>
                <FormatBalance balance={redeemData?.fee} token={liquidToken} />
              </ListValue>
            </ListItem>
            <ListItem>
              <ListLabel>
                <div className="flex flex-center">
                  Transaction Fee
                  <Popover content="Acala transaction fees can be paid in any available token, please go to Settings to change it.">
                    <InformationCircleIcon className="w-16 h-16 text-[#b1b0bc] m-0" />
                  </Popover>
                </div>
              </ListLabel>
              <ListValue>
                <FormatBalance
                  token={nativeToken?.name}
                  human
                  balance={redeemData.networkFee}
                />
              </ListValue>
            </ListItem>
          </List>
        </FormPanel>
      </div>
    </Card>
  );
};
