import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import seekerPng from "../../assets/png/seeker.png";
import emptyPageStateStyles from "./emptyPageState.module.scss";

export default function EmptyPageState(props: {
  text: string;
  isVisibleBtn: boolean;
}) {
  const { text, isVisibleBtn } = props;
  return (
    <article className={emptyPageStateStyles.emptyPageState}>
      <Image src={seekerPng} alt="seeker" />
      <span className={emptyPageStateStyles.emptyPageState__text}>{text}</span>
      {isVisibleBtn && (
        <Link href="/">
          <Button
            variant="light"
            radius="md"
            className={emptyPageStateStyles.emptyPageState__btn}
          >
            Поиск Вакансий
          </Button>
        </Link>
      )}
    </article>
  );
}
