import { createReducer } from "@reduxjs/toolkit";

import { setBalanceVisible, setModal, setSelectedAddress, setSelectedEndpoint } from "./actions";
import { ApplicationState, ModalType } from "./types";

const initState: ApplicationState = {
	modal: {
    [ModalType.ConnectExtension]: { visible: false } // show connector modal as default
  },
};

export const applicationReducer = createReducer(initState, (builder) => {
	return builder
		.addCase(setModal, (state, action) => {
			const { data, key } = action.payload;

			// will clear all related data when the modal close
			if (data.visible == false) {
				state.modal = {
					...state.modal,
					[key]: { visible: false }
				}
			} else {
				state.modal = {
					...state.modal,
					[key]: data,
				};
			}

		})
    .addCase(setSelectedEndpoint, (state, action) => {
      const { value } = action.payload;

      state.selectedEndpoint = value;
    })

    .addCase(setSelectedAddress, (state, action) => {
      const { value } = action.payload;

      state.selectedAddress = value;
    })

    .addCase(setBalanceVisible, (state, action) => {
      const { value } = action.payload;

      state.balanceVisible = value;
    })
});
