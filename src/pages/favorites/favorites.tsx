import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import favoritesStyles from "./favorites.module.scss";
import NoFavorites from "@/components/NoFavorites/NoFavorites";
import VacancyWithLink from "@/components/VacancyWithLink/VacancyWithLink";
import { IVacancy } from "@/types/types";

export default function FavoritesPage() {
  const [faveStorage, setFaveStorage] = useState<IVacancy[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFaveStorage(JSON.parse(localStorage.getItem("favorites") || "[]"));
    }
  }, []);

  return (
    <main>
      <aside className={favoritesStyles.favorites}>
        <Header activePage="MarkedPage" />
        <section className={favoritesStyles.favorites__main}>
          <div className={favoritesStyles.favorites__mainWrapper}>
            {faveStorage.length ? (
              <section className={favoritesStyles.favorites__vacancies}>
                {faveStorage.map((item) => (
                  <VacancyWithLink vacancyObj={item} key={item.id} />
                ))}
              </section>
            ) : (
              <NoFavorites />
            )}
          </div>
        </section>
        {faveStorage.length ? <section>pagination block</section> : ""}
      </aside>
    </main>
  );
}
