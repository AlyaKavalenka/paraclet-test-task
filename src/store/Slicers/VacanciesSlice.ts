/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AUTHORIZATION,
  BASE_URL,
  X_API_APP_ID,
  X_SECRET_KEY,
} from "@/utils/request";
import { FetchVacanciesParams, IVacancies } from "@/types/types";

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async ({
    catalogues,
    payment_from,
    payment_to,
    keyword,
  }: FetchVacanciesParams) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/vacancies/?catalogues=${catalogues}&payment_from=${payment_from}&payment_to=${payment_to}&keyword=${keyword}`,
      headers: {
        "x-secret-key": X_SECRET_KEY,
        "x-api-app-id": X_API_APP_ID,
        Authorization: AUTHORIZATION,
      },
    };

    const res = await axios.request(config);
    const data = await res.data;
    return data;
  }
);

const VacanciesSlice = createSlice({
  name: "vacancies",
  initialState: {
    value: <IVacancies>{},
    isLoading: false,
    error: <string | undefined | null>null,
  },
  reducers: {
    vacanciesArray: (state, action: PayloadAction<IVacancies>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVacancies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchVacancies.fulfilled,
      (state, action: PayloadAction<IVacancies>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchVacancies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { vacanciesArray } = VacanciesSlice.actions;

export default VacanciesSlice.reducer;
