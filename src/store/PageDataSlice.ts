import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  currPageNo: number;
  selectedItems : string[],
  totalSelected: number,
  totalPages?: number;
}

const initialState: PageState = {
  currPageNo: 1,
  selectedItems: [],
  totalSelected: 0,
  totalPages: undefined,
};

const PageSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setCurrPageNo: (state, action: PayloadAction<number>) => {
      state.currPageNo = action.payload;
    },
    setTotalPages:(state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
      state.totalSelected = 0;
    },
  },
});

export const {setCurrPageNo,setTotalPages, clearSelectedItems} =  PageSlice.actions;
export default PageSlice.reducer;
