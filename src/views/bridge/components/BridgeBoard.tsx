import { BaseComponentProps, Button, TopBoard } from '@components';
import { SDKNetwork } from '@sdk/types';
import { getNetworkName } from '@utils';
import { memo } from 'react';

interface BridgeTopBoardProps extends BaseComponentProps {
  network: SDKNetwork;
}

export const BridgeTopBoard = memo<BridgeTopBoardProps>(({ network }) => {
  return (
    <TopBoard>
      <div className='flex py-30 flex-between w-full h-full min-h-126'>
        <div>
          <p className='text-20 leading-24 text-2e2d33 font-semibold mb-12'>Bridge</p>
          <p className='text-16 leading-27 text-494853 max-w-[513px] font-medium'>
            Bridge cross-chain assets to {getNetworkName(network)}.
          </p>
        </div>
        <div className='flex flex-center'>
          <Button round='lg' size='sm' variant='filled'>
            Watch Video
          </Button>
          <Button className='ml-32' round='lg' size='sm' variant='outline'>
            User Guide
          </Button>
        </div>
      </div>
    </TopBoard>
  );
});
