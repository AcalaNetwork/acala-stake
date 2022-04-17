import { createAction } from '@reduxjs/toolkit';
import { BalanceDisplayType, ModalData, ModalType } from './types';

export const setModal = createAction<{ key: ModalType; data: ModalData }>('application/setModal');

export const setSelectedEndpoint = createAction<{ value: string }>('application/setSelectedEndpoint');

export const setSelectedAddress = createAction<{ value: string }>('application/setSelectedAddress');

export const setBalanceVisible = createAction<{ value: boolean }>('application/setBalanceVisible');

export const setBalanceDisplayType = createAction<{
  value: BalanceDisplayType;
}>('application/setBalanceDisplayType');
