/* eslint-disable @typescript-eslint/naming-convention */
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "@mantine/core";
import Header from "@/components/Header/Header";
import vacancyStyles from "./vacancy.module.scss";
import VacancyComp from "@/components/VacancyComp/VacancyComp";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVacancy } from "@/store/Slicers/ClickedVacancySlice";
import vacanciesStyles from "../../components/Vacancies/vacancies.module.scss";

export default function VacancyPage() {
  const id = useRouter().query.vacancyid as string;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVacancy(id));
  }, [dispatch, id]);

  const vacancyObj = useAppSelector((state) => state.clickedVacancy.value);
  const isLoading = useAppSelector((state) => state.clickedVacancy.isLoading);
  const error = useAppSelector((state) => state.clickedVacancy.error);

  let vacancyContent;
  if (isLoading) {
    vacancyContent = (
      <section className={vacanciesStyles.vacanciesBlock__preload}>
        <Loader
          color="#5E96FC"
          variant="dots"
          size="lg"
          className={vacanciesStyles.loader}
        />
      </section>
    );
  } else if (error) {
    vacancyContent = (
      <section className={vacanciesStyles.vacanciesBlock__preload}>
        <h3>Something went wrong...</h3>
      </section>
    );
  } else if (vacancyObj !== undefined) {
    vacancyContent = (
      <>
        <VacancyComp
          id={vacancyObj.id}
          catalogues={vacancyObj.catalogues}
          profession={vacancyObj.profession}
          firmName={vacancyObj.firmName}
          town={{
            title: vacancyObj.town ? vacancyObj.town.title : "",
          }}
          type_of_work={{
            title: vacancyObj.type_of_work ? vacancyObj.type_of_work.title : "",
          }}
          payment_to={vacancyObj.payment_to}
          payment_from={vacancyObj.payment_from}
          currency={vacancyObj.currency}
          vacancyRichText={vacancyObj.vacancyRichText}
        />
        <section className={vacancyStyles.vacancy__info}>
          {parse(vacancyObj.vacancyRichText || "")}
        </section>
      </>
    );
  }

  return (
    <main>
      <aside className={vacancyStyles.vacancy}>
        <Header activePage="SearchPage" />
        <section className={vacancyStyles.vacancy__main}>
          <div className={vacancyStyles.vacancy__mainWrapper}>
            {vacancyContent}
          </div>
        </section>
      </aside>
    </main>
  );
}
