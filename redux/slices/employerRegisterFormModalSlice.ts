import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const employerRegisterFormModalSlice = createSlice({
	name: 'employerRegisterFormModal',
	initialState,
	reducers: {
		openEmployerRegisterModal: (state) => {
			state.isOpen = true;
		},
		closeEmployerRegisterModal: (state) => {
			state.isOpen = false;
		},
	},
});

export const { openEmployerRegisterModal, closeEmployerRegisterModal } =
	employerRegisterFormModalSlice.actions;
export default employerRegisterFormModalSlice.reducer;
