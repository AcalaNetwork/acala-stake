import { useContext } from "react";
import { Button } from "../components/Button";
import { Modal, ModalHeader } from "../components/Modal";
import { useModal } from "../state";
import { ModalType } from "../state/application/types";
import { LiquidityProviderContext } from "../views/swap/LiquidityContext";

export const AddLiquidityConfirmModal = () => {
  const { setStep } = useContext(LiquidityProviderContext);
  const type = ModalType.addLiquidityConfirm;
  const [visible, open, close] = useModal(type);

  return (
    <Modal
      visible={visible}
      onClose={close}
      header={<ModalHeader onClose={close}>Confirm Add Liquidity</ModalHeader>}
    >
      <div className="pt-[40px] px-[40px] flex flex-center flex-col">
        <p className="text-[18px] text-7b7986 font-normal leading-[27px]">
          Adding liquidity in one token will swap part of the share value into
          another token according to the exchange rate. Transaction fees and
          slippage fees will affect your share amount.
        </p>
        <p className="mt-60 text-494853 text-20 font-medium text-center">
          Are you sure you want to proceed?
        </p>
        <Button
          size="sm"
          round="lg"
          className="w-[180px] h-[45px] mt-[19px]"
          onClick={() => {
            close();
            setTimeout(() => {
              setStep("result");
            }, 500);
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
