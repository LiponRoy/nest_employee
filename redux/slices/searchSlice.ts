import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  category: string;
}

const initialState: SearchState = {
  category: '',
};
 
const searchSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category ='';
    },
  
  },
  

});

export const { setCategory,resetCategory } = searchSlice.actions;
export default searchSlice.reducer;
