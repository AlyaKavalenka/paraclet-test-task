/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IVacancy } from "@/types/types";

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    value: <IVacancy[]>[],
  },
  reducers: {
    favoritesArray: (state, action: PayloadAction<IVacancy[]>) => {
      state.value = action.payload;
    },
    addNewFavorite: (state, action: PayloadAction<IVacancy>) => {
      const newArray = [
        ...state.value,
        <IVacancy>{
          id: action.payload.id,
          catalogues: action.payload.catalogues,
          profession: action.payload.profession,
          firmName: action.payload.firmName,
          town: action.payload.town,
          type_of_work: action.payload.type_of_work,
          payment_to: action.payload.payment_to,
          payment_from: action.payload.payment_from,
          currency: action.payload.currency,
          vacancyRichText: action.payload.vacancyRichText,
        },
      ];
      state.value = newArray;
    },
  },
});

export const { favoritesArray, addNewFavorite } = FavoritesSlice.actions;

export default FavoritesSlice.reducer;
