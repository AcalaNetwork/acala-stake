import { useContext } from "react";
import { Button } from "../components/Button";
import { Modal, ModalHeader } from "../components/Modal";
import { useModal } from "../state";
import { ModalType } from "../state/application/types";
import { BridgeProviderContext } from "../views/bridge/BridgeContext";

export const BridgeConfirmModal = () => {
  const { setStep } = useContext(BridgeProviderContext);
  const type = ModalType.bridgeConfirm;
  const [visible, open, close] = useModal(type);

  return (
    <Modal
      visible={visible}
      onClose={close}
      header={<ModalHeader onClose={close}>Confirm Transaction</ModalHeader>}
    >
      <div className="pt-[40px] px-[40px] flex flex-center flex-col">
        <p className="text-[18px] text-grey-3 font-normal leading-[27px]">
          Withdrawing tokens directly to an{" "}
          <strong>exchange is not supported.</strong> You need to bridge assets
          to your own account on its original network (e.g. DOT to the Polkadot
          Network) first, before sending it to an exchange account.
        </p>
        <p className="mt-60 text-494853 text-20 font-medium text-center">
          Are you sure you want to proceed?
        </p>
        <Button size='sm' round="lg" className="w-[180px] h-[45px] mt-[19px]" onClick={() => {
          close()
          setTimeout(() => {
            setStep('result')
          }, 500)
        }}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
