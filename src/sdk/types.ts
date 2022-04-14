import { CrossChain, Homa, Liquidity, Wallet } from '@acala-network/sdk';
import { SwapRx } from '@acala-network/sdk-swap';

export interface SDK {
  wallet?: Wallet;
  swap?: SwapRx;
  liquidity?: Liquidity;
  homa?: Homa;
}

export type SDKNetwork = 'karura' | 'acala';

export type SDKStore = {
  [k in SDKNetwork]: SDK;
} & {
  crossChain: CrossChain
}