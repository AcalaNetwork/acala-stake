export type ModalData<T = Record<string, any>> = { visible: boolean } & T

export enum ModalType {
  'ConnectExtension',
  'noExtension',
  'emptyAccount',
  'selectAccount',
  'bridgeConfirm',
  'addLiquidityConfirm',
  'unstakeConfirm',
  'flexibleFee'
}

export type BalanceDisplayType = 'USD' | 'AMOUNT';

export interface ApplicationState {
  // save the modal data
  modal: { [key in ModalType]?: ModalData };
  // save selected endpoint for next connecting
  selectedEndpoint?: string;
  // save selected account as default select
  selectedAddress?: string;

  balanceVisible: boolean;
  balanceDisplayType: BalanceDisplayType
}