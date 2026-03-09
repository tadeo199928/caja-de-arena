import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ImgRender } from "./ImgRender";

const initialState = {
  selectedGods: JSON.parse(localStorage.getItem('selectedGods') || '[]') as ImgRender[],
};

export const godsSlice = createSlice({
  name: "gods",
  initialState: initialState,

  reducers: {
    addGod: (state, action: PayloadAction<ImgRender>) => {
      state.selectedGods.push(action.payload);
    },
    removeGod: (state, action: PayloadAction<ImgRender>) => {
      state.selectedGods = state.selectedGods.filter(
        (god) => god.id !== action.payload.id,
      );
    },

    clearGod: (state) => {
      state.selectedGods = [];
    },
  },
});

export const { addGod, removeGod, clearGod } = godsSlice.actions;
export default godsSlice.reducer;
