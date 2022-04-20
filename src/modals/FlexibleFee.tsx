import { Token } from '@acala-network/sdk-core';
import { useFeeSwapPaths } from '@hooks/useFeeSwapPaths';
import { useEffect, useMemo, useState } from 'react';
import { TokenSelector } from '../components/form';
import { FormatBalance } from '../components/FormatBalance';
import { Modal, ModalHeader } from '../components/Modal';
import { TokenImage } from '../components/TokenImage';
import { TxButton } from '../components/TxButton';
import { useExtrinsic } from '../connector';
import { useFlexiPayToken } from '../sdk/hooks/wallet/useFlexiPayToken';
import { useSetFlexiPayToken } from '../sdk/hooks/wallet/useSetFlexiPayToken';
import { SDKNetwork } from '../sdk/types';
import { useCloseModal, useModalVisible } from '../state';
import { ModalType } from '../state/application/types';

export const FlexibleFeeModal = () => {
  const [network, setNetwork] = useState<SDKNetwork>('karura');
  const type = ModalType.flexibleFee;
  const visible = useModalVisible(type);
  const closeModal = useCloseModal(type);
  const tokens = useFeeSwapPaths(network);
  const allTokens = useMemo(() => tokens.map((item) => item[0]), [tokens]);
  const payToken = useFlexiPayToken(network);
  const [value, setValue] = useState<Token>();
  const setFlexiPayToken = useSetFlexiPayToken(network);
  const { call, fee } = useExtrinsic(setFlexiPayToken(value));

  useEffect(() => {
    if (payToken) setValue(payToken);
  }, [payToken]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal header={<ModalHeader onClose={closeModal}>Flexible Fee</ModalHeader>} onClose={() => {}}
      visible={visible}>
      <div className='px-40 py-24'>
        <div className='flex items-center gap-20 mb-20 text-333 font-medium'>
          <div
            className={`flex flex-center gap-8 cursor-pointer p-10 ${
              network === 'karura' ? 'border-b-2 border-primary' : 'border-b-2 border-transparent'
            }`}
            onClick={() => setNetwork('karura')}
          >
            <TokenImage size={20} token={'KAR'} />
            KARURA
          </div>
          <div
            className={`flex flex-center gap-8 cursor-pointer p-10 ${
              network === 'acala' ? 'border-b-2 border-primary' : 'border-b-2 border-transparent'
            }`}
            onClick={() => setNetwork('acala')}
          >
            <TokenImage size={20} token={'DOT'} />
            ACALA
          </div>
        </div>
        <div className='text-16 font-medium text-333 mb-8'>Set the next default token</div>
        <TokenSelector
          className='relative border border-d6d3de h-60 rounded-16'
          listClassName='h-[150px] overflow-y-auto'
          onChange={(e) => setValue(e)}
          tokens={allTokens}
          value={value}
        />
        <div className='border border-d6d3de h-60 rounded-16 mt-24 flex flex-between px-16 text-494853 text-16 font-medium bg-d6d3de'>
          <div>Flexible Fee</div>
          <div>
            <FormatBalance balance={fee.amount} token={fee.token} />
          </div>
        </div>
        <div className='flex flex-center'>
          <TxButton call={call} className='mt-24 w-100'
            network={'acala'}>
            Save
          </TxButton>
        </div>
      </div>
    </Modal>
  );
};
