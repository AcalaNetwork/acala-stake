import { Button } from "../components/Button";
import { Modal, ModalHeader } from "../components/Modal";
import { useModal } from "../state";
import { ModalType } from "../state/application/types";

export const UnstakeConfirmModal = () => {
  const type = ModalType.unstakeConfirm;
  const [visible, open, close] = useModal(type);

  return (
    <Modal
      visible={visible}
      onClose={close}
      header={<ModalHeader onClose={close}>Unstake Request</ModalHeader>}
    >
      <div className="pt-[40px] px-[40px] flex flex-center flex-col">
        <p className="text-[18px] text-grey-3 font-normal leading-[27px]">
          Unstake Request will put your unstake amount in a queue for
          processing. New Unstake Request will replace currently queued request
        </p>
        <p className="mt-60 text-494853 text-20 font-medium text-center">
          Your queued Unstake Requests is 100 LDOT. See details here.
        </p>
        <div className="flex justify-around w-full">
          <Button
            size="sm"
            round="lg"
            variant="outline"
            className="w-[180px] h-[45px] mt-[19px]"
            onClick={() => {
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            round="lg"
            className="w-[180px] h-[45px] mt-[19px]"
            onClick={() => {
              close();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
