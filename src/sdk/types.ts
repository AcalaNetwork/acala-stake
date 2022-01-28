import { Homa, Liquidity, Wallet } from '@acala-network/sdk';
import { SwapRx } from '@acala-network/sdk-swap';

export interface SDK {
  wallet?: Wallet;
  swap?: SwapRx;
  liquidity?: Liquidity;
  homa?: Homa;
}

export type SDKNetwork = 'acala' | 'karura';

export type SDKStore = Record<SDKNetwork, SDK>;