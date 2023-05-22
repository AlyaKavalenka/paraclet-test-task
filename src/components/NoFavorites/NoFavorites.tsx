import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import seekerPng from "../../assets/png/seeker.png";
import nofavesStyles from "./nofave.module.scss";

export default function NoFavorites() {
  return (
    <article className={nofavesStyles.nofaves}>
      <Image src={seekerPng} alt="seeker" />
      <span className={nofavesStyles.nofaves__text}>
        Упс, здесь еще ничего нет!
      </span>
      <Link href="/">
        <Button
          variant="light"
          radius="md"
          className={nofavesStyles.nofaves__btn}
        >
          Поиск Вакансий
        </Button>
      </Link>
    </article>
  );
}
