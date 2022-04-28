import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreState } from '..';
import { setBalanceDisplayType, setBalanceVisible, setModal, setSelectedAddress, setSelectedEndpoint } from './actions';
import { BalanceDisplayType, ModalType } from './types';

// selected endpoint
export const useSetSelectedEndpoint = () => {
  const dispatch = useDispatch();

  return useCallback((endpoint: string) => dispatch(setSelectedEndpoint({ value: endpoint })), []);
};

// selected balance visible
export const useSetBalanceVisible = () => {
  const dispatch = useDispatch<StoreDispatch>();

  return useCallback((visible: boolean) => {
    dispatch(setBalanceVisible({ value: visible }));
  }, [dispatch]);
};

export const useBalanceVisible = () => {
  return useSelector((state: StoreState) => state.application.balanceVisible);
};

// set balance display type
export const useSetBalanceDisplayType = () => {
  const dispatch = useDispatch<StoreDispatch>();

  return useCallback((type: BalanceDisplayType) => {
    dispatch(setBalanceDisplayType({ value: type }));
  }, [dispatch]);
};

export const useBalanceDisplayType = () => {
  const type = useSelector((state: StoreState) => state.application.balanceDisplayType);
  const update = useSetBalanceDisplayType();

  return useMemo(() => ({ type, update }), [type, update]);
};

export const useSelectedEndpoint = () => useSelector((state: StoreState) => state.application.selectedEndpoint);

// selected address
export const useSetSelectedAddress = () => {
  const dispatch = useDispatch();

  return useCallback((address: string) => dispatch(setSelectedAddress({ value: address })), [dispatch]);
};

export const useSelectedAddress = () => useSelector((state: StoreState) => state.application.selectedAddress);

// modal
export const useModalVisible = (type: ModalType) =>
  useSelector((state: StoreState) => state.application.modal[type]?.visible || false);

export const useModalData = (type: ModalType) =>
  useSelector((state: StoreState) => state.application.modal[type]);

export const useOpenModal = (type: ModalType) => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(setModal({ key: type, data: { visible: true } })), [dispatch, type]);
};

export const useOpenWithDataModal = (type: ModalType) => {
  const dispatch = useDispatch();

  return useCallback((data: any) => dispatch(setModal({ key: type, data: { visible: true, ...data } })), [dispatch, type]);
};

export const useCloseModal = (type: ModalType) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setModal({ key: type, data: { visible: false } }));
  }, [dispatch, type]);
};

export const useModal = (type: ModalType) => {
  const visible = useModalVisible(type);
  const data = useModalData(type);
  const open = useOpenModal(type);
  const openWithData = useOpenWithDataModal(type);
  const close = useCloseModal(type);

  return useMemo(() => ({ visible, open, close, data, openWithData }), [close, data, open, openWithData, visible]);
};
