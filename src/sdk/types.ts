import { CrossChain, Homa, Liquidity, Wallet } from '@acala-network/sdk';
import { SwapRx } from '@acala-network/sdk-swap';
import { History } from '@acala-network/sdk/history';

export interface SDK {
  wallet?: Wallet;
  swap?: SwapRx;
  liquidity?: Liquidity;
  homa?: Homa;
  history?: History;
}

export type SDKNetwork = 'karura' | 'acala';

export type SDKStore = {
  [k in SDKNetwork]: SDK;
} & {
  crossChain: CrossChain;
};
