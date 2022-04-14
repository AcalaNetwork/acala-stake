import { ApiRx } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { InjectedExtension, InjectedAccount } from "@polkadot/extension-inject/types";
import { ConnectedNetworks } from "config";
import { ReactNode } from "react";

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
  network: ConnectedNetworks;
  onSuccess?: () => void;
  onFailed?: () => void;
  onInBlock?: () => void;
}

export interface SubstrateConnectorData {
	api: ApiRx | null; // use `null` as default
  network: ConnectedNetworks; // the target network of the connection
	status: ConnectStatus; // the api connect status
  isConnected: () => Promise<boolean>; // wait app connect
}

export interface SubstrateConnectorConfig {
  isPrimary: boolean;
  network: ConnectedNetworks;
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