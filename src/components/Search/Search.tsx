import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import SearchIcon from "@/assets/svg/searchIcon";
import searchStyle from "./search.module.scss";

export default function Search() {
  const form = useForm({
    initialValues: {
      search: "",
    },
  });
  return (
    <form className={searchStyle.search} onSubmit={(value) => {}}>
      <TextInput
        placeholder="Введите название вакансии"
        icon={<SearchIcon />}
        className={searchStyle.search__input}
        {...form.getInputProps("search")}
      />
      <Button className={searchStyle.search__btn} type="submit">
        Поиск
      </Button>
    </form>
  );
}
