import { CrossChain } from '@acala-network/sdk';
import { useSDKConnector } from './hooks/useSDKConnector';

export type SDK = ReturnType<typeof useSDKConnector>;

export type SDKNetwork = 'karura' | 'acala';

export type SDKStore = {
  [k in SDKNetwork]: SDK;
} & {
  crossChain: CrossChain;
};
