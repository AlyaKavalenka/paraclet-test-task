/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IVacancy } from "@/types/types";
import {
  AUTHORIZATION,
  BASE_URL,
  X_API_APP_ID,
  X_SECRET_KEY,
} from "@/utils/request";

export const fetchVacancy = createAsyncThunk(
  "vacancies/fetchVacancy",
  async (id: string) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/vacancies/${id}/`,
      headers: {
        "x-secret-key": X_SECRET_KEY,
        "x-api-app-id": X_API_APP_ID,
        Authorization: AUTHORIZATION,
      },
    };
    let data;
    if (typeof id === "string") {
      const res = await axios.request(config);
      data = await res.data;
    }
    return data;
  }
);

const ClickedVacancySlice = createSlice({
  name: "clickedVacancy",
  initialState: {
    value: <IVacancy>{},
    isLoading: false,
    error: <string | undefined | null>null,
  },
  reducers: {
    clickedVacancy: (state, action: PayloadAction<IVacancy>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVacancy.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchVacancy.fulfilled,
      (state, action: PayloadAction<IVacancy>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchVacancy.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clickedVacancy } = ClickedVacancySlice.actions;

export default ClickedVacancySlice.reducer;
