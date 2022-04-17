import { useState } from 'react';
import { Card } from '@components/Card';
import { Spacing } from '@components/Spacing';
import { Table } from '@components/Table';

export const TabsCard = () => {
  const [tab, setTab] = useState(0);

  const unstakeData = [
    {
      request: '',
      rate: 9.8,
      time: '2022-01-12',
      duration: 29,
      status: 'WAITING',
    },
    {
      request: '100 LDOT (~10DOT）',
      rate: 9.8,
      time: '2022-01-12',
      duration: 29,
      status: 'UNSTAKED',
    },
  ];

  const rewardData = [
    {
      amount: 1,
      rate: 9.8,
      date: '2022-01-12',
    },
    {
      amount: 1,
      rate: 9.8,
      date: '2022-01-12',
    },
  ];

  const unstakeColumns = [
    {
      Header: 'Unstake Requests',
      accessor: 'request',
      Cell: (props: any) => <div className='flex items-center text-primary font-medium text-14'>{props.value}</div>,
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (props: any) => (
        <div className='text-12 font-medium'>
          {props.value === 'WAITING' ? (
            <div className='text-[#ff8800] border border-[#ff8800] bg-[#ff8800] bg-opacity-10 w-120 h-32 rounded-16 flex flex-center'>
              {props.value}
            </div>
          ) : (
            <div className='text-[#61c288] border border-[#61c288] bg-[#61c288] bg-opacity-10 w-120 h-32 rounded-16 flex flex-center'>
              {props.value}
            </div>
          )}
        </div>
      ),
    },
    {
      Header: 'DOT:LDOT Rate',
      accessor: 'rate',
      Cell: (props: any) => <div className='flex items-center text-494853 text-14'>1 : {props.value}</div>,
    },
    {
      Header: 'Request On',
      accessor: 'time',
      Cell: (props: any) => <div className='flex items-center text-2e2d33 text-14 font-medium'>{props.value}</div>,
    },
    {
      Header: 'Est. Unstake Duration*',
      accessor: 'duration',
      Cell: (props: any) => (
        <div className='flex items-center text-primary text-14 font-medium'>{props.value} Days</div>
      ),
    },
  ];

  const rewardColumns = [
    {
      Header: () => <div className='flex flex-center w-full'>Amount</div>,
      accessor: 'amount',
      Cell: (props: any) => <div className='flex flex-center text-494853 text-14'>{props.value}</div>,
    },
    {
      Header: <div className='flex flex-center w-full'>DOT:LDOT Rate</div>,
      accessor: 'rate',
      Cell: (props: any) => <div className='flex flex-center text-494853 text-14'>1 : {props.value}</div>,
    },
    {
      Header: <div className='flex flex-center w-full'>Date</div>,
      accessor: 'date',
      Cell: (props: any) => <div className='flex flex-center text-494853 text-14'>{props.value}</div>,
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
      <Card variant='gradient-border' className='px-[55px] py-32'>
        {tab === 0 ? (
          <Table data={unstakeData} columns={unstakeColumns} />
        ) : (
          <Table data={rewardData} columns={rewardColumns} />
        )}
      </Card>
    </>
  );
};
