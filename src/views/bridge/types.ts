import { ConnectedNetworks } from 'config';

export enum BridgeSteps {
  'FORM',
  'CONFIRM',
  'COMPLATED',
}

export interface BridgeContextData {
  step: BridgeSteps;
  network: ConnectedNetworks;

  form: {
    amount: number;
    token: string;
  };

  hooks: {
    useSetStep: () => (step: BridgeSteps) => void;
  };
}
