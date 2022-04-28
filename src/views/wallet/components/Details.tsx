import { memo } from 'react';
import { TokenCard } from './TokenCard';
import { StakeData } from '../hook/useAssetOverview';
import { BaseComponentProps, Loading } from '@components';

interface DetailsProps extends BaseComponentProps {
  details: StakeData[];
}

export const Details = memo<DetailsProps>(({ details, className }) => {

  return (
    <div className={className}>
      { details.length === 0 && (
        <div className='min-h-[160px] flex items-center justify-center'>
          <Loading />
        </div>
      ) }
      {
        details.map((item) => {
          return <TokenCard {...item} className='mb-30'
            key={`balance-card-${item.token.name}`} />;
        })
      }
    </div>
  );
});
