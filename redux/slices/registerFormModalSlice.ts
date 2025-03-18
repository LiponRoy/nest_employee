import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const registerFormModalSlice = createSlice({
	name: 'registerFormModal',
	initialState,
	reducers: {
		openRegisterModal: (state) => {
			state.isOpen = true;
		},
		closeRegisterModal: (state) => {
			state.isOpen = false;
		},
	},
});

export const { openRegisterModal, closeRegisterModal } =
	registerFormModalSlice.actions;
export default registerFormModalSlice.reducer;
