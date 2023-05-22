import { useEffect } from "react";
import { Loader } from "@mantine/core";
import Link from "next/link";
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
        salary = `з/п ${vacancyObj.payment_from} - ${vacancyObj.payment_to} ${vacancyObj.currency}`;
      } else if (vacancyObj.payment_from && !vacancyObj.payment_to) {
        salary = `з/п от ${vacancyObj.payment_from} ${vacancyObj.currency}`;
      } else if (!vacancyObj.payment_from && vacancyObj.payment_to) {
        salary = `з/п от ${vacancyObj.payment_to} ${vacancyObj.currency}`;
      } else {
        salary = "";
      }

      return (
        <Link href="/vacancy" key={vacancyObj.id}>
          <article className={vacanciesStyles.vacancy}>
            <section className={vacanciesStyles.vacancy__info}>
              <span className={vacanciesStyles.vacancy__proff}>
                {vacancyObj.profession}
              </span>
              {salary && (
                <section className={vacanciesStyles.vacancy__salaryNType}>
                  <span className={vacanciesStyles.vacancy__text_salary}>
                    {salary}
                  </span>
                  <span className={vacanciesStyles.vacancy__text_dot}>•</span>
                  {vacancyObj.type_of_work.title && (
                    <span className={vacanciesStyles.vacancy__text}>
                      {vacancyObj.type_of_work.title}
                    </span>
                  )}
                </section>
              )}
              {vacancyObj.town.title && (
                <section className={vacanciesStyles.vacancy__location}>
                  <LocationIcon />
                  <span className={vacanciesStyles.vacancy__text}>
                    {vacancyObj.town.title}
                  </span>
                </section>
              )}
            </section>
            <aside>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("click on star");
                }}
                className={vacanciesStyles.vacancy__btn}
              >
                <StarIcon mode="empty" />
              </button>
            </aside>
          </article>
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
