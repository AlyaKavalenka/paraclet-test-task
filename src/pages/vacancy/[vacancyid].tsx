import Header from "@/components/Header/Header";
import { IVacancy } from "@/types/types";
import vacancyStyles from "./vacancy.module.scss";

export default function VacancyPage(props: IVacancy) {
  const { profession } = props;
  return (
    <main>
      <aside className={vacancyStyles.vacancy}>
        <Header activePage="SearchPage" />
        <section className={vacancyStyles.vacancy__main}>
          <div>Vacancy page</div>
        </section>
      </aside>
    </main>
  );
}
