import { useEffect } from "react";
import { Loader } from "@mantine/core";
import Link from "next/link";
import { fetchVacancies } from "@/store/Slicers/VacanciesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IVacancies } from "@/types/types";
import vacanciesStyles from "./vacancies.module.scss";
import VacancyComp from "../VacancyComp/VacancyComp";
import { clickedVacancy } from "@/store/Slicers/ClickedVacancySlice";

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

  let vacanciesJSX;
  if (vacancies.objects) {
    vacanciesJSX = vacancies.objects.map((vacancyObj) => {
      return (
        <Link
          href={`/vacancy/${vacancyObj.id}`}
          key={vacancyObj.id}
          onClick={() => dispatch(clickedVacancy(vacancyObj))}
        >
          <VacancyComp
            id={vacancyObj.id}
            catalogues={vacancyObj.catalogues}
            profession={vacancyObj.profession}
            firmName={vacancyObj.firmName}
            town={{
              title: vacancyObj.town.title,
            }}
            type_of_work={{
              title: vacancyObj.type_of_work.title,
            }}
            payment_to={vacancyObj.payment_to}
            payment_from={vacancyObj.payment_from}
            currency={vacancyObj.currency}
          />
        </Link>
      );
    });
  }

  return (
    <div className={vacanciesStyles.vacanciesBlock}>
      <section className={vacanciesStyles.vacanciesBlock__preload}>
        {isLoading && (
          <Loader
            color="#5E96FC"
            variant="dots"
            size="lg"
            className={vacanciesStyles.loader}
          />
        )}
        {error && <h3>Something went wrong...</h3>}
      </section>
      {vacancies.objects && (
        <section className={vacanciesStyles.vacanciesBlock__vacancies}>
          {vacanciesJSX}
        </section>
      )}
    </div>
  );
}
