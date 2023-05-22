import Header from "@/components/Header/Header";
import favoritesStyles from "./favorites.module.scss";
import { useAppSelector } from "@/store/hooks";
import NoFavorites from "@/components/NoFavorites/NoFavorites";

export default function FavoritesPage() {
  const faveVacancies = useAppSelector((state) => state.favorites.value);

  return (
    <main>
      <aside className={favoritesStyles.favorites}>
        <Header activePage="MarkedPage" />
        <section className={favoritesStyles.favorites__main}>
          <div className={favoritesStyles.favorites__mainWrapper}>
            {faveVacancies.length ? <div>Favorites page</div> : <NoFavorites />}
          </div>
        </section>
        {faveVacancies.length ? <section>pagination block</section> : ""}
      </aside>
    </main>
  );
}
