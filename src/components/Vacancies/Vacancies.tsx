import { Loader } from "@mantine/core";
import { useAppSelector } from "@/store/hooks";
import { IVacancies } from "@/types/types";
import vacanciesStyles from "./vacancies.module.scss";
import VacancyWithLink from "../VacancyWithLink/VacancyWithLink";

export default function Vacancies() {
  const vacancies: IVacancies = useAppSelector(
    (state) => state.vacanciesSlice.value
  );
  const isLoading = useAppSelector((state) => state.vacanciesSlice.isLoading);
  const error = useAppSelector((state) => state.vacanciesSlice.error);

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
          {vacancies.objects.map((item) => (
            <VacancyWithLink vacancyObj={item} key={item.id} />
          ))}
        </section>
      )}
    </div>
  );
}
