import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import homeStyles from "./index.module.scss";
import Filter from "@/components/Filter/Filter";
import Search from "@/components/Search/Search";
import Vacancies from "@/components/Vacancies/Vacancies";
import { FetchVacanciesParams } from "@/types/types";
import { useAppDispatch } from "@/store/hooks";
import { fetchVacancies } from "@/store/Slicers/VacanciesSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FetchVacanciesParams>({
    catalogues: "",
    payment_from: "",
    payment_to: "",
    keyword: "",
  });

  useEffect(() => {
    dispatch(fetchVacancies(filter));
  }, [dispatch, filter]);

  return (
    <main>
      <aside className={homeStyles.home}>
        <Header activePage="SearchPage" />
        <section className={homeStyles.home__main}>
          <Filter
            updateFilter={(value: FetchVacanciesParams) =>
              setFilter({
                catalogues: value.catalogues,
                payment_from: value.payment_from,
                payment_to: value.payment_to,
                keyword: filter.keyword,
              })
            }
          />
          <section className={homeStyles.searchVacancy}>
            <Search />
            <Vacancies />
          </section>
        </section>
        <section>pagination block</section>
      </aside>
    </main>
  );
}
