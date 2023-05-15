import Link from "next/link";
import Logo from "@/assets/svg/logo";

type ActivePage = "SearchPage" | "MarkedPage";

interface IHeaderProps {
  activePage: ActivePage;
}

export default function Header(props: IHeaderProps) {
  const { activePage } = props;

  return (
    <header className="header">
      <section className="logo">
        <Link href="/">
          <Logo />
        </Link>
      </section>
      <section className="nav">
        <Link
          href="/"
          className={`nav__link ${
            activePage === "SearchPage" ? "nav__link_active" : ""
          }`}
        >
          Поиск Вакансий
        </Link>
        <Link
          href="/"
          className={`nav__link ${
            activePage === "MarkedPage" ? "nav__link_active" : ""
          }`}
        >
          Избранное
        </Link>
      </section>
    </header>
  );
}
