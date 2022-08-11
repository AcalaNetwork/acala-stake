import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState, ModalData, ModalType } from './types';

const initState: ApplicationState = {
  modal: {},
  selectedAddress: ''
};

export const application = createSlice({
  name: 'application',
  initialState: initState,
  reducers: {
    setModal(state, action: PayloadAction<{ data: ModalData, key: ModalType }>) {
      const { data, key } = action.payload;

      // will clear all related data when the modal close
      if (data.visible == false) {
        state.modal = {
          ...state.modal,
          [key]: { visible: false },
        };
      } else {
        state.modal = {
          ...state.modal,
          [key]: data,
        };
      }
    },
    setSelectedAddress(state, action: PayloadAction<{ value: string }>) {
      const { value } = action.payload;

      state.selectedAddress = value;
    }
  }
});

export default application;

export const { setModal, setSelectedAddress } = application.actions;

