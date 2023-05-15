import Header from "@/components/Header/Header";
import homeStyles from "./index.module.scss";
import Filter from "@/components/Filter/Filter";
import Search from "@/components/Search/Search";

export default function Home() {
  return (
    <main>
      <aside className={homeStyles.home}>
        <Header activePage="SearchPage" />
        <section className={homeStyles.home__main}>
          <Filter />
          <section className={homeStyles.searchVacancy}>
            <Search />
          </section>
        </section>
      </aside>
    </main>
  );
}
