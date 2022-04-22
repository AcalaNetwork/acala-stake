import { Token } from '@acala-network/sdk-core';
import { useFeeSwapPaths } from '@hooks/useFeeSwapPaths';
import { useEffect, useMemo, useState } from 'react';
import { TxButton, ChainImage, Modal, ModalHeader, TokenSelector, FormatBalance } from '@components';
import { useExtrinsic } from '@connector';
import { useFlexiPayToken } from '@sdk/hooks/wallet/useFlexiPayToken';
import { useSetFlexiPayToken } from '@sdk/hooks/wallet/useSetFlexiPayToken';
import { SDKNetwork } from '@sdk/types';
import { useModal, ModalType } from '@state';

export const FlexibleFeeModal = () => {
  const [network, setNetwork] = useState<SDKNetwork>('karura');
  const { visible, close: closeModal } = useModal(ModalType.FlexibleFee);
  const feeSwapPaths = useFeeSwapPaths(network);
  const selectedableTokens = useMemo(() => feeSwapPaths.map((item) => item[0]), [feeSwapPaths]);
  const payToken = useFlexiPayToken(network);
  const [value, setValue] = useState<Token>();
  const setFlexiPayToken = useSetFlexiPayToken(network);
  const { call, fee } = useExtrinsic(setFlexiPayToken(value));

  useEffect(() => {
    if (payToken) setValue(payToken);
  }, [payToken]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal header={<ModalHeader onClose={closeModal}>Flexible Fee</ModalHeader>} onClose={closeModal}
      visible={visible}>
      <div className='px-40 py-24'>
        <div className='flex items-center gap-20 mb-20 text-333 font-medium'>
          <div
            className={`flex flex-center gap-8 cursor-pointer p-10 ${
              network === 'karura' ? 'border-b-2 border-primary' : 'border-b-2 border-transparent'
            }`}
            onClick={() => setNetwork('karura')}
          >
            <ChainImage chain={'karura'} size={20} />
            KARURA
          </div>
          <div
            className={`flex flex-center gap-8 cursor-pointer p-10 ${
              network === 'acala' ? 'border-b-2 border-primary' : 'border-b-2 border-transparent'
            }`}
            onClick={() => setNetwork('acala')}
          >
            <ChainImage chain={'acala'} size={20} />
            ACALA
          </div>
        </div>
        <div className='text-16 font-medium text-333 mb-8'>Set the next default token</div>
        <TokenSelector
          className='relative border border-grey-5 h-60 rounded-16'
          listClassName='h-[150px] overflow-y-auto'
          onChange={(e) => setValue(e)}
          tokens={selectedableTokens}
          value={value}
        />
        <div className='border border-grey-5 h-60 rounded-16 mt-24 flex flex-between px-16 text-grey-2 text-16 font-medium bg-grey-5'>
          <div>Flexible Fee</div>
          <div>
            <FormatBalance balance={fee.amount} token={fee.token} />
          </div>
        </div>
        <div className='flex flex-center'>
          <TxButton call={call} className='mt-24 w-full'
            network={'acala'}>
            Save
          </TxButton>
        </div>
      </div>
    </Modal>
  );
};
