import { Modal, ModalHeader } from '../components/Modal';
import { useModal } from '../state';
import { ModalType } from '../state/application/types';
import { useUserLoanIncentive } from '@sdk';
import { SDKNetwork } from '@sdk/types';
import { Token } from '@acala-network/sdk-core';
import { memo } from 'react';
import { useClaimIncentiveCall } from './hooks/useClaimIncentiveCall';
import { FormatBalance, List, ListItem, ListLabel, ListValue, TxButton } from '@components';
import { getTokenName } from '@utils';
import { TokenName } from '@components/TokenName';

interface ClaimLoanIncentiveRewards {
  network?: SDKNetwork;
  token?: Token;
}

export const ClaimLoanIncentiveRewards = memo<ClaimLoanIncentiveRewards>(({ network, token }) => {
  const { visible, close, data } = useModal(ModalType.ClaimLoanIncentiveRewards);
  const selectedNetwork = network || data?.network as SDKNetwork;
  const selectedToken =  token || data?.token as Token;

  const user = useUserLoanIncentive(selectedNetwork, selectedToken);
  const { call } = useClaimIncentiveCall(selectedNetwork, selectedToken);

  return (
    <Modal
      header={
        <ModalHeader onClose={close}>Rewards</ModalHeader>
      }
      onClose={close}
      visible={visible}
    >
      <div className='px-40 py-24'>
        <List className='border-none mb-40'>
          <ListItem>
            <ListLabel>Total Reward</ListLabel>
            <ListValue>
              {
                user?.rewards.map((i) => {
                  return (
                    <div className='flex gap-4 justify-end' key={i.rewardToken.symbol}>
                      <FormatBalance balance={i.claimableReward} />
                      <TokenName token={i.rewardToken} />
                    </div>
                  );
                })
              }
            </ListValue>
          </ListItem>
        </List>
        <TxButton call={call} message={`Claim loans-${getTokenName(token)} rewards`}
          network={network}>Claim</TxButton>
      </div>
    </Modal>
  );
});
