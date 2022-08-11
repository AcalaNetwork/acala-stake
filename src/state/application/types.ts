export type ModalData<T = Record<string, unknown>> = { visible: boolean } & T;

export enum ModalType {
  'ConnectExtension',
  'SelectAccount',
  'NoExtension',
  'EmptyAccount',
  'BridgeConfirm'
}

export interface ApplicationState {
  // save the modal data
  modal: { [key in ModalType]?: ModalData };
  // save selected account as default select
  selectedAddress?: string;
}
