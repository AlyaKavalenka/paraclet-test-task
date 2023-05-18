/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTHORIZATION, BASE_URL, X_SECRET_KEY } from "@/utils/request";
import { ICatalogues } from "@/types/types";

export const fetchCatalogues = createAsyncThunk(
  "catalogues/fetchCatalogues",
  async () => {
    const config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/catalogues/`,
      headers: {
        "x-secret-key": X_SECRET_KEY,
        Authorization: AUTHORIZATION,
      },
    };
    const res = await axios.request(config);
    const data = await res.data;
    return data;
  }
);

const CataloguesSlice = createSlice({
  name: "catalogues",
  initialState: {
    value: <ICatalogues[]>[],
    isLoading: false,
    error: <string | undefined | null>null,
  },
  reducers: {
    cataloguesArray: (state, action: PayloadAction<ICatalogues[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogues.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCatalogues.fulfilled,
      (state, action: PayloadAction<ICatalogues[]>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchCatalogues.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { cataloguesArray } = CataloguesSlice.actions;

export default CataloguesSlice.reducer;
