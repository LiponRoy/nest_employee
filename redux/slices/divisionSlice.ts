import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DivisionState {
  division: string[];
}

const initialState: DivisionState = {
  division: [],
};

const divisionSlice = createSlice({
  name: 'division',
  initialState,
  reducers: {
    setDivision(state, action: PayloadAction<string[]>) {
      state.division = action.payload;
    },
    toggleDivision(state, action: PayloadAction<string>) {
      if (state.division.includes(action.payload)) {
        state.division = state.division.filter(d => d !== action.payload);
      } else {
        state.division.push(action.payload);
      }
    }, 
    resetDivision: (state) => {
      state.division = [];
    },
  },
});

export const { setDivision, toggleDivision,resetDivision } = divisionSlice.actions;
export default divisionSlice.reducer;
