import { ApiRx } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { InjectedExtension, InjectedAccount } from "@polkadot/extension-inject/types";
import { ReactNode } from "react";
import { CONNECTED_NETWORK } from "../config";

export enum ConnectStatus {
  'disconnected',
  'connecting',
  'connected',
  'ready',
  'failed'
}

export enum SendSatuts {
  'pending',
  'sending',
  'success',
  'failed'
}

export interface SubmitData {
  trackId: string;
  call: SubmittableExtrinsic<'rxjs'>;
  message: ReactNode;
  status: SendSatuts;
  hash?: string;
  network: CONNECTED_NETWORK;
  onSuccess?: () => void;
  onFailed?: () => void;
  onInBlock?: () => void;
}

export interface SubstrateConnectorData {
	api: ApiRx | null; // use `null` as default
  network: CONNECTED_NETWORK; // the target network of the connection
	status: ConnectStatus; // the api connect status
  isPrimary: boolean; // mark the network is primary
  isConnected: () => Promise<boolean>; // wait app connect
}

export interface SubstrateConnectorConfig {
  isPrimary: boolean;
  network: CONNECTED_NETWORK;
  endpoints: Record<string, string>;
  first?: string; // set the top priority endpoint
}

export interface ExtensionConnectorData {
  extension: InjectedExtension | null;
  status: ConnectStatus;
  connect?: () => Promise<void> 
  injectedAccounts: InjectedAccount[];
  active?: InjectedAccount;
  setActive: (account: InjectedAccount) => Promise<void>
}