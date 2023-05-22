/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IVacancy } from "@/types/types";

const ClickedVacancySlice = createSlice({
  name: "clickedVacancy",
  initialState: {
    value: <IVacancy>{},
  },
  reducers: {
    clickedVacancy: (state, action: PayloadAction<IVacancy>) => {
      state.value = action.payload;
    },
  },
});

export const { clickedVacancy } = ClickedVacancySlice.actions;

export default ClickedVacancySlice.reducer;
