import Header from "@/components/Header/Header";
import favoritesStyles from "./favorites.module.scss";

export default function FavoritesPage() {
  return (
    <main>
      <aside className={favoritesStyles.favorites}>
        <Header activePage="MarkedPage" />
        <section className={favoritesStyles.home__main}>
          <div>Favorites page</div>
        </section>
        <section>pagination block</section>
      </aside>
    </main>
  );
}
