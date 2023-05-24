import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import favoritesStyles from "./favorites.module.scss";
import EmptyPageState from "@/components/EmptyPageState/emptyPageState";
import { IVacancy } from "@/types/types";
import Paginate from "@/components/Paginate/Paginate";

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
                <Paginate data={faveStorage} />
              </section>
            ) : (
              <EmptyPageState text="Упс, здесь еще ничего нет!" isVisibleBtn />
            )}
          </div>
        </section>
      </aside>
    </main>
  );
}
