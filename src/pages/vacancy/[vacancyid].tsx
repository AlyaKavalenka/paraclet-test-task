/* eslint-disable @typescript-eslint/naming-convention */
import parse from "html-react-parser";
import Header from "@/components/Header/Header";
import vacancyStyles from "./vacancy.module.scss";
import VacancyComp from "@/components/VacancyComp/VacancyComp";
import { useAppSelector } from "@/store/hooks";

export default function VacancyPage() {
  const vacancyObj = useAppSelector((state) => state.clickedVacancy.value);

  return (
    <main>
      <aside className={vacancyStyles.vacancy}>
        <Header activePage="SearchPage" />
        <section className={vacancyStyles.vacancy__main}>
          <div className={vacancyStyles.vacancy__mainWrapper}>
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
              vacancyRichText={vacancyObj.vacancyRichText}
            />
            <section className={vacancyStyles.vacancy__info}>
              {parse(vacancyObj.vacancyRichText)}
            </section>
          </div>
        </section>
      </aside>
    </main>
  );
}
