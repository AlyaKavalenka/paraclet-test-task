import { Loader } from "@mantine/core";
import { useAppSelector } from "@/store/hooks";
import vacanciesStyles from "./vacancies.module.scss";
import Paginate from "../Paginate/Paginate";
import EmptyPageState from "../EmptyPageState/emptyPageState";

export default function Vacancies() {
  const vacancies = useAppSelector((state) => state.vacanciesSlice.value);
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
      {(vacancies.objects || []).length > 0 ? (
        <section className={vacanciesStyles.vacanciesBlock__vacancies}>
          <Paginate data={vacancies.objects} />
        </section>
      ) : (
        <EmptyPageState
          text="Упс, ничего не нашлось! :("
          isVisibleBtn={false}
        />
      )}
    </div>
  );
}
