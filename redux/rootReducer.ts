import { combineReducers } from '@reduxjs/toolkit';
import { CounterSlice } from './slices/CounterSlice';

export const rootReducer = combineReducers({
	counter: CounterSlice.reducer,
	// another: AnotherSlice.reducer, // Add more reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
