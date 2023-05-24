import Link from "next/link";
import Logo from "@/assets/svg/logo";
import HeaderStyles from "./header.module.scss";

type ActivePage = "SearchPage" | "MarkedPage";

interface IHeaderProps {
  activePage: ActivePage;
}

export default function Header(props: IHeaderProps) {
  const { activePage } = props;

  return (
    <header className={HeaderStyles.header}>
      <section className="logo">
        <Link href="/">
          <Logo />
        </Link>
      </section>
      <section className={HeaderStyles.nav}>
        <Link
          href="/"
          className={
            HeaderStyles.nav__link || activePage === "SearchPage"
              ? HeaderStyles.nav__link_active
              : ""
          }
        >
          Поиск Вакансий
        </Link>
        <Link
          href="/favorites/favorites"
          className={
            HeaderStyles.nav__link || activePage === "MarkedPage"
              ? HeaderStyles.nav__link_active
              : ""
          }
        >
          Избранное
        </Link>
      </section>
    </header>
  );
}
