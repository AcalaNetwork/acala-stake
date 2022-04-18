import { FixedPointNumber } from "@acala-network/sdk-core";
import { RegisteredChain } from "@acala-network/sdk/cross-chain/configs/chains";
import { CrossChainTransferParams } from "@acala-network/sdk/cross-chain/types";
import { useInput } from "@hooks";
import { useCrossChainInputConfigs } from "@sdk/hooks/crosschain/useCrossChainInputConfigs";
import { useMemo } from "react";

export const useBridgeAmountInput = (network: RegisteredChain, params: Omit<CrossChainTransferParams, 'amount'>) => {
  const inputConfigs = useCrossChainInputConfigs(network, params);

  const balanceInput = useInput({
    type: 'number',
    init: 0,
    rules: [
      {
        type: 'number',
        required: true,
        min: inputConfigs?.minInput.toNumber(),
        max: inputConfigs?.maxInput.toNumber()
      }
    ]
  });

  return useMemo(() => {
    // expected receive = input value - destiance chain cross chain fee
    const expectedReceive = 
    inputConfigs ? 
      new FixedPointNumber(balanceInput.value, inputConfigs?.tokenDecimals)
        .minus(
          inputConfigs.destCrossChainFee.token === params.token ? 
            inputConfigs.destCrossChainFee.balance : FixedPointNumber.ZERO
        ): FixedPointNumber.ZERO;

    return [balanceInput, {
      decimals: inputConfigs?.tokenDecimals,
      min: inputConfigs?.minInput.toNumber(),
      max: inputConfigs?.maxInput.toNumber(),
      expectedReceive,
      destCrossChainFee: inputConfigs?.destCrossChainFee
    }] as const;
  }, [balanceInput, inputConfigs, params.token]);
};

export type BridgeAmountInputConfigs = ReturnType<typeof useBridgeAmountInput>;