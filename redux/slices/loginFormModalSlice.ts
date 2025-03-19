import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const loginFormModalSlice = createSlice({
	name: 'loginFormModal',
	initialState,
	reducers: {
		openLoginModal: (state) => {
			state.isOpen = true;
		},
		closeLoginModal: (state) => {
			state.isOpen = false;
		},
	},
});

export const { openLoginModal, closeLoginModal } =
	loginFormModalSlice.actions;
export default loginFormModalSlice.reducer;
