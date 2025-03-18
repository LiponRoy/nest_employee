import { combineReducers } from '@reduxjs/toolkit';
import { CounterSlice } from './slices/CounterSlice';
import { baseApi } from './rtk/baseApi';
import registerFormModalSlice from './slices/registerFormModalSlice';

export const rootReducer = combineReducers({
	counter: CounterSlice.reducer,
	// another: AnotherSlice.reducer, // Add more reducers here
	[baseApi.reducerPath]: baseApi.reducer, // Add base API reducer
	registerFormModal:registerFormModalSlice
});

export type RootState = ReturnType<typeof rootReducer>;
