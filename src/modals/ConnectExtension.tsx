import { Dialog } from '@headlessui/react';
import { Modal } from '../components/Modal';
import { useModal, useOpenModal } from '../state';
import { ModalType } from '../state/application/types';
import Logo from '/public/images/acala-circle.svg';
import PolkadotExtensionLogo from '/public/images/polkadot-extension-logo.svg';
import ColorArrow from '/public/icons/color-arrow.svg';
import AlertCircle from '/public/icons/alert-circle.svg';
import { useCallback, useEffect, useState } from 'react';
import { useExtension } from '../connector/hooks/useExtension';
import { ConnectStatus } from '../connector/types';
import { Loading } from '../components/Loading';
import styled from 'styled-components';

const useIsLoading = (init: boolean) => {
  const [state, setState] = useState<boolean>(init);

  useEffect(() => {
    if (init === false) {
      setTimeout(() => setState(init), 1000);
    } else {
      setState(init);
    }
  }, [init]);

  return state;
};

export const ConnectExtensionModal = () => {
  const { visible, close: closeConnectExtension } = useModal(ModalType.ConnectExtension);
  const openSelectAccountModal = useOpenModal(ModalType.SelectAccount);
  const extension = useExtension();
  // make sure the loading animation lasts at least 1s
  const isLoading = useIsLoading(extension.status === ConnectStatus.connecting);
  const isFailed = extension.status === ConnectStatus.failed;

  const connectViaPolkadotExtension = useCallback(() => {
    console.log('test', extension);
    extension
      .connect?.()
      .then(() => {
        // if the extension connected success, then open the select account modal
        closeConnectExtension();
        openSelectAccountModal();
      })
      .catch((e) => {
        console.log(e);
        // ignore error
      });
  }, [closeConnectExtension, extension, openSelectAccountModal]);

  return (
    <Modal
      header={
        isFailed ? (
          <ErrorHeader />
        ) : (
          <Dialog.Title as='h3' className='flex flex-col items-center border-b pt-32 pb-24 border-grey-66'>
            <div className='flex-center rounded-circle w-48 h-48 mb-16'>
              <Logo />
            </div>
            <p className='font-semibold text-sm text-grey-2 mb-4'>Connect Wallet</p>
            <p className='text-sm text-grey-3'>To start using Acala</p>
          </Dialog.Title>
        )
      }
      onClose={closeConnectExtension}
      visible={visible}
    >
      {isFailed ? <ErrorContent /> : null}
      <div className='px-68 pt-32 pb-64'>
        <div className='flex items-center' onClick={connectViaPolkadotExtension}>
          <PolkadotExtensionLogo />
          <p className='flex-1 text-base pl-16 text-grey-2'>{isFailed ? 'Try Again' : 'Polkdot{.js} extension'}</p>
          {isLoading ? <Loading size='sm' /> : <ColorArrow className='cursor-pointer' />}
        </div>
      </div>
      <p className='text-center text-sm text-grey-3'>
        By connecting, I accept Acala’s <a className='text-primary font-medium'>Terms of Service</a>
      </p>
    </Modal>
  );
};

const ErrorHeader = () => {
  return (
    <Dialog.Title as='h3' className='flex flex-col items-center pt-32 pb-56'>
      <div className='flex-center bg-grey-66 rounded-circle w-48 h-48 mb-16'>
        <AlertCircle />
      </div>
      <p className='font-semibold text-sm text-grey-2 mb-4'>Connection Failed</p>
    </Dialog.Title>
  );
};

const OrderBefore = styled.div<{ order: number }>`
  display: flex;
  column-gap: 4px;

  &:before {
    display: block;
    content: '${({ order }) => order + '.'}';
  }
`;

const ErrorContent = () => {
  return (
    <div className='px-32 text-base2 text-grey-3 mb-12'>
      <OrderBefore className='mb-24' order={1}>
        <div>
          {'Download Polkadot{js}'} Extension to supported browser <a className='text-primary'>here</a>.
        </div>
      </OrderBefore>
      <OrderBefore order={2}>
        <div>
          Follow this <a className='text-primary'>guide</a> to create a new account or import from existing account.
        </div>
      </OrderBefore>
    </div>
  );
};
