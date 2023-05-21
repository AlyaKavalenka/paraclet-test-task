import { useEffect } from "react";
import { Loader } from "@mantine/core";
import { fetchVacancies } from "@/store/Slicers/VacanciesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IVacancies } from "@/types/types";
import LocationIcon from "@/assets/svg/locationIcon";
import StarIcon from "@/assets/svg/starIcon";
import vacanciesStyles from "./vacancies.module.scss";

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
      let salary;
      if (vacancyObj.payment_from && vacancyObj.payment_to) {
        salary = `${vacancyObj.payment_from} - ${vacancyObj.payment_to}`;
      } else if (vacancyObj.payment_from && !vacancyObj.payment_to) {
        salary = `от ${vacancyObj.payment_from}`;
      } else if (!vacancyObj.payment_from && vacancyObj.payment_to) {
        salary = `от ${vacancyObj.payment_to}`;
      } else {
        salary = "";
      }

      return (
        <article key={vacancyObj.id} className={vacanciesStyles.vacancy}>
          <section>
            <span>{vacancyObj.profession}</span>
            <section>
              {salary && (
                <section>
                  <span>з/п</span>
                  <span>{salary}</span>
                  <span>{vacancyObj.currency}</span>
                  <span>•</span>
                  {vacancyObj.type_of_work.title && (
                    <span>{vacancyObj.type_of_work.title}</span>
                  )}
                </section>
              )}
            </section>
            {vacancyObj.town.title && (
              <section>
                <LocationIcon />
                <span>{vacancyObj.town.title}</span>
              </section>
            )}
          </section>
          <aside>
            <button type="button" onClick={() => {}}>
              <StarIcon mode="empty" />
            </button>
          </aside>
        </article>
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
