import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import SearchIcon from "@/assets/svg/searchIcon";
import searchStyle from "./search.module.scss";
import { FetchVacanciesParams } from "@/types/types";

interface ISearchProps {
  updateFilter: (value: FetchVacanciesParams) => void;
}

export default function Search(props: ISearchProps) {
  const { updateFilter } = props;
  const form = useForm({
    initialValues: {
      search: "",
    },
  });
  return (
    <form
      className={searchStyle.search}
      onSubmit={form.onSubmit((value) => {
        updateFilter({ keyword: value.search });
      })}
    >
      <TextInput
        placeholder="Введите название вакансии"
        icon={<SearchIcon />}
        className={searchStyle.search__input}
        {...form.getInputProps("search")}
        data-elem="search-input"
      />
      <Button
        className={searchStyle.search__btn}
        type="submit"
        data-elem="search-button"
      >
        Поиск
      </Button>
    </form>
  );
}
