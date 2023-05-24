import { Loader } from "@mantine/core";
import { useAppSelector } from "@/store/hooks";
import { IVacancy } from "@/types/types";
import vacanciesStyles from "./vacancies.module.scss";
import VacancyWithLink from "../VacancyWithLink/VacancyWithLink";

export default function Vacancies(props: { currentItems: IVacancy[] }) {
  const { currentItems } = props;
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
      {currentItems && (
        <section className={vacanciesStyles.vacanciesBlock__vacancies}>
          {currentItems.map((item) => (
            <VacancyWithLink vacancyObj={item} key={item.id} />
          ))}
        </section>
      )}
    </div>
  );
}
