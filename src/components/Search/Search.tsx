import { Button, TextInput } from "@mantine/core";
import SearchIcon from "@/assets/svg/searchIcon";
import searchStyle from "./search.module.scss";

export default function Search() {
  return (
    <div className={searchStyle.search}>
      <TextInput
        placeholder="Введите название вакансии"
        icon={<SearchIcon />}
        className={searchStyle.search__input}
      />
      <Button className={searchStyle.search__btn}>Поиск</Button>
    </div>
  );
}
