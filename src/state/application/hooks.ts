import { AppState } from '@state';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, setSelectedAddress } from './slice';
import { ModalType } from './types';

// selected address
export const useSetSelectedAddress = () => {
  const dispatch = useDispatch();

  return useCallback((address: string) => dispatch(setSelectedAddress({ value: address })), [dispatch]);
};

// modal
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
  const visible = useSelector((state: AppState) => state.application.modal[type]?.visible || false);
  const data = useSelector((state: AppState) => state.application.modal[type]);
  const open = useOpenModal(type);
  const openWithData = useOpenWithDataModal(type);
  const close = useCloseModal(type);

  return useMemo(() => ({ visible, open, close, data, openWithData }), [close, data, open, openWithData, visible]);
};
