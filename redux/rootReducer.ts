import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './rtk/baseApi';
import registerFormModalSlice from './slices/registerFormModalSlice';
import loginFormModalSlice from './slices/loginFormModalSlice';
import employerRegisterFormModalSlice from './slices/employerRegisterFormModalSlice';
import searchSlice from './slices/searchSlice';

export const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	registerFormModal: registerFormModalSlice,
	employerRegisterFormModal: employerRegisterFormModalSlice,
	loginFormModal: loginFormModalSlice,
	searchCategory: searchSlice, // 
});

export type RootState = ReturnType<typeof rootReducer>;
