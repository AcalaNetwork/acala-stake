export type ModalData<T = Record<string, unknown>> = { visible: boolean } & T;

export enum ModalType {
  'ConnectExtension',
  'SelectAccount',
  'noExtension',
  'emptyAccount',
  'bridgeConfirm',
  'addLiquidityConfirm',
  'unstakeConfirm',
  'FlexibleFee',
  'ClaimLoanIncentiveRewards'
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
  balanceDisplayType: BalanceDisplayType;
}
