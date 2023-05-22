import Header from "@/components/Header/Header";
import favoritesStyles from "./favorites.module.scss";

export default function FavoritesPage() {
  return (
    <main>
      <aside className={favoritesStyles.favorites}>
        <Header activePage="MarkedPage" />
        <section className={favoritesStyles.favorites__main}>
          <div className={favoritesStyles.favorites__mainWrapper}>
            <div>Favorites page</div>
          </div>
        </section>
        <section>pagination block</section>
      </aside>
    </main>
  );
}
