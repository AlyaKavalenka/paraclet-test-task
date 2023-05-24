import { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";
import Header from "@/components/Header/Header";
import homeStyles from "./index.module.scss";
import Filter from "@/components/Filter/Filter";
import Search from "@/components/Search/Search";
import Vacancies from "@/components/Vacancies/Vacancies";
import { FetchVacanciesParams, IVacancies, IVacancy } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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

  const itemsPerPage = 4;
  const [activePage, setPage] = useState(1);
  const vacancies: IVacancies = useAppSelector(
    (state) => state.vacanciesSlice.value
  );
  const isLoading = useAppSelector((state) => state.vacanciesSlice.isLoading);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems: IVacancy[] = (vacancies.objects || []).slice(
    itemOffset,
    endOffset
  );

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
            <Search
              updateFilter={(value: FetchVacanciesParams) =>
                setFilter({
                  catalogues: filter.catalogues,
                  payment_from: filter.payment_from,
                  payment_to: filter.payment_to,
                  keyword: value.keyword,
                })
              }
            />
            <Vacancies currentItems={currentItems} />
          </section>
        </section>
        {!isLoading && (
          <Pagination
            total={vacancies.objects.length}
            value={activePage}
            onChange={(e) => {
              setPage(e);
              setItemOffset(
                (activePage * itemsPerPage) % vacancies.objects.length
              );
            }}
            position="center"
          />
        )}
      </aside>
    </main>
  );
}
