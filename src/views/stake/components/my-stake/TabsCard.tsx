import { memo, useState } from 'react';
import { Card } from '@components/Card';
import { Spacing } from '@components/Spacing';
import { Table } from '@components/Table';
import { useHomaLiquidTokenSummary } from '../../hook/useHomaLiquidTokenSummary';
import { SDKNetwork } from '@sdk/types';
import { useHomaHistory } from '@views/stake/hook/useHomaHistory';
import { Button } from '@components';

export const TabsCard = memo<{ network: SDKNetwork }>(({ network }) => {
  const [tab, setTab] = useState(0);
  const summary = useHomaLiquidTokenSummary(network);
  const history = useHomaHistory(network);

  const unstakeColumns = [
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (props: any) => <div className='flex items-center text-primary font-medium text-14'>{props.value}</div>,
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (props: any) => (
        <div className='text-12 font-medium'>
          <div className='text-[#61c288] border border-[#61c288] bg-[#61c288] bg-opacity-10 w-120 h-32 rounded-16 flex flex-center'>
            {props.value}
          </div>
        </div>
      ),
    },
    {
      Header: 'Est. Yield',
      accessor: 'Est',
      Cell: (props: any) => <div className='flex items-center text-primary text-14 font-medium'>{props.value}</div>,
    },
  ];

  const rewardColumns = [
    {
      Header: 'Action',
      accessor: 'message',
      Cell: (props: any) => <div className='flex text-494853 text-14 max-w-[300px]'>{props.value}</div>,
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (props: any) => <div className='flex flex-center text-494853 text-14'>1 : {props.value}</div>,
    },
    {
      Header: 'Link',
      accessor: 'link',
      Cell: (props: any) => (
        <Button size='sm' variant='text'>
          <a href={props.value} rel="noreferrer"
            target='_blank' >
            subScan
          </a>
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className='flex flex-center gap-40 text-16 leading-[32px] font-semibold cursor-pointer'>
        <div
          className={`border-b-2 ${tab === 0 ? 'text-primary border-primary' : ' border-transparent'}`}
          onClick={() => setTab(0)}
        >
          Unstake Requests
        </div>
        <div
          className={`border-b-2 ${tab === 1 ? 'text-primary border-primary' : ' border-transparent'}`}
          onClick={() => setTab(1)}
        >
          Reward History
        </div>
      </div>
      <Spacing h={37} />
      <Card className='px-[55px] py-32' variant='gradient-border'>
        {tab === 0 ? (
          <Table columns={unstakeColumns} data={summary} />
        ) : (
          <Table columns={rewardColumns} data={history} />
        )}
      </Card>
    </>
  );
});
