import { useEffect } from "react";
import { Loader } from "@mantine/core";
import { fetchVacancies } from "@/store/Slicers/VacanciesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IVacancies } from "@/types/types";

export default function Vacancies() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);
  const vacancies: IVacancies = useAppSelector(
    (state) => state.vacanciesSlice.value
  );
  const isLoading = useAppSelector((state) => state.vacanciesSlice.isLoading);
  const error = useAppSelector((state) => state.vacanciesSlice.error);

  if (vacancies.objects) {
    console.log(vacancies.objects[0]);
  }

  return (
    <div>
      {isLoading && <Loader color="#5E96FC" variant="dots" size="lg" />}
      {error && <h3>Something went wrong...</h3>}
      {vacancies.objects && <article>Variables</article>}
    </div>
  );
}
