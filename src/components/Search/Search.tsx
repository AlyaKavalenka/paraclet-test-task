import { Button, TextInput } from "@mantine/core";
import SearchIcon from "@/assets/svg/searchIcon";

export default function Search() {
  return (
    <TextInput
      placeholder="Введите название вакансии"
      icon={<SearchIcon />}
      rightSection={<Button>Поиск</Button>}
    />
  );
}
