import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import CataloguesSlice from "./Slicers/CataloguesSlice";
import VacanciesSlice from "./Slicers/VacanciesSlice";
import ClickedVacancySlice from "./Slicers/ClickedVacancySlice";

const rootReducer = combineReducers({
  cataloguesSlice: CataloguesSlice,
  vacanciesSlice: VacanciesSlice,
  clickedVacancy: ClickedVacancySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
