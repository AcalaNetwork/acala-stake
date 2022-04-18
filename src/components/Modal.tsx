import { Transition, Dialog } from '@headlessui/react';
import { FC, Fragment, PropsWithChildren, ReactNode } from 'react';
import CloseIcon from '/public/icons/close.svg';

type ModalProps = PropsWithChildren<{
  header: ReactNode;
  visible: boolean;
  onClose: () => void;
  contentClassName?: string;
}>;

export const Modal: FC<ModalProps> = ({ children, visible, header, onClose, contentClassName }) => {
  const mergedContentClassName = `inline-block w-full max-w-[560px] pb-32 text-left align-middle transition-all transform bg-fff shadow rounded-xl ${contentClassName}`;

  return (
    <Transition appear as={Fragment}
      show={visible}>
      <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto'
        onClose={onClose}>
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-overlay opacity-70' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span aria-hidden='true' className='inline-block h-screen align-middle'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className={mergedContentClassName}>
              {header}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

interface ModalHeaderProps {
  onClose?: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ onClose, children }) => {
  return (
    <Dialog.Title className='relative font-medium text-24 text-2e2d33 leading-29  pt-24 pb-20 px-40 border-b border-eae9f0'>
      <div className='flex flex-between'>
        {children}
        {onClose && <CloseIcon className=' cursor-pointer' onClick={onClose} />}
      </div>
    </Dialog.Title>
  );
};
