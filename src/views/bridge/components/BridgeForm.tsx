import { AddressInputSelector, BalanceInput, Button, Card, FormatBalance, FormPanel, List, ListItem, ListLabel, ListValue, TokenSelector } from '@components';
import { TokenName } from '@components/TokenName';
import { memo, useCallback } from 'react';
import { useBridge } from '../hooks/useBridger';
import { BridgeRouterSelector } from './BridgeRouterSelector';
import tw from 'tailwind-styled-components';
import { BridgeSteps } from '../types';

const InfoItem = tw.div`flex text-13 leading16 mt-12 first:mt-0`;
const InfoLable = tw.div`text-grey-3 mr-4`;
const InfoValue = tw.div`text-grey-2 font-medium flex`;

export const BridgeForm = memo(() => {
  const {
    token,
    bridgeRouter,
    bridgeAmountInput,
    bridgeDestAddress,
    setStep,
    onBackInForm
  } = useBridge();
  const [amountInputData, amountInputConfigs] = bridgeAmountInput;

  const handleSwap = useCallback(() => {
    bridgeRouter.onToggle();
    amountInputData.onValidate();
  }, [amountInputData, bridgeRouter]);

  const handleNext = useCallback(async () => {
    await amountInputData.onValidate().then((value) => {
      setStep(BridgeSteps.CONFIRM);
    }).catch(() => {
      // ingore error
    });
  }, [amountInputData, setStep]);

  return (
    <Card className="w-[630px] px-55 py-32" variant="border">
      <FormPanel
        label='Assets'
      >
        <TokenSelector disabled={true} tokens={[token]}
          value={token} />
      </FormPanel>
      <BridgeRouterSelector
        className='mt-28'
        {...bridgeRouter}
        onToggle={handleSwap}
      />
      <FormPanel
        className='mt-28'
        error={amountInputData.error}
        label={
          <div className='flex justify-between items-center'>
            <p>Balance</p>
            <div className='flex'>
              <p className='text-grey-3 mr-4'>Available:</p>
              <FormatBalance balance={amountInputConfigs.max} />
              <TokenName className='mr-4' token={token} />
            </div>
          </div>
        }
      >
        <BalanceInput
          onChange={amountInputData.onChange}
          onMax={amountInputData.onMax}
          value={amountInputData.value}
        />
      </FormPanel>
      <FormPanel
        className='mt-28'
        label='Destination'
      >
        <AddressInputSelector {...bridgeDestAddress} />
      </FormPanel>
      <div className='mt-10'>
        <InfoItem>
          <InfoLable>Minimum amount required:</InfoLable>
          <InfoValue>
            <FormatBalance balance={amountInputConfigs.min} />
            <TokenName token={token} />
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLable>You will receive:</InfoLable>
          <InfoValue>
            <FormatBalance balance={amountInputConfigs.expectedReceive} />
            <TokenName token={token} />
          </InfoValue>
        </InfoItem>
      </div>
      <div className='flex gap-22 mt-38'>
        {
          onBackInForm && (
            <Button className='flex-1' color='primary'
              onClick={onBackInForm}
              variant='outline'
            >
              Back
            </Button>
          )
        }
        <Button className='flex-1' color='primary'
          onClick={handleNext}
          variant='filled'
        >
          Next
        </Button>
      </div>
    </Card>
  );
});
