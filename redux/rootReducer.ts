import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './rtk/baseApi';
import registerFormModalSlice from './slices/registerFormModalSlice';
import loginFormModalSlice from './slices/loginFormModalSlice';

export const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	registerFormModal: registerFormModalSlice,
	loginFormModal: loginFormModalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
