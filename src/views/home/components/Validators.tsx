import { memo } from 'react';
import { Card } from '@components/Card';
import { useValidators, Validator } from '../hooks/useValidator';
import { AddressAvatar } from '@components/AddressAvatar';
import { Address } from '@components/Address';
import { FixedPointNumber } from '@acala-network/sdk-core';

const ValidatorItem = memo<{ validator: Validator }>(({ validator }) => {
  return (
    <Card className='flex pt-38 pl-32 pb-32'>
      <div className='w-64 h-64 border-f1f0f2 rounded-circle'>
        <AddressAvatar address={validator.stash_account_display.address} size={64} />
      </div>
      <div className='flex flex-col ml-32'>
        <span>
          <Address address={validator.stash_account_display.address} />
        </span>
        <span className='mt-4 mb-8 text-333 text-20 font-semibold'>
          {validator?.stash_account_display?.display || validator?.stash_account_display?.parent?.display || '-'}
        </span>
        <span>
          Total stake:{' '}
          <span className=' text-primary'>
            {FixedPointNumber.fromInner(validator?.bonded_nominators || 0, 12)
              .add(FixedPointNumber.fromInner(validator.bonded_owner, 12))
              .toString()}
          </span>
        </span>
      </div>
    </Card>
  );
});

export const Validators = memo(() => {
  const validators = useValidators().slice(0, 4);
  return (
    <div className='container'>
      <div className='text-[36px] leading-[44px] text-2e2d33 tracking-[0.04em] text-center font-bold'>
        Current Validators
      </div>
      <div className='mt-[62px] w-full grid grid-cols-2 gap-38 text-4f4f4f text-16 leading-[24px]'>
        {validators.map((item, i) => (
          <ValidatorItem key={i} validator={item} />
        ))}
      </div>
    </div>
  );
});
