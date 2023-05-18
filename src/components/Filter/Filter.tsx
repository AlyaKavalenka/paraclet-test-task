import { useForm } from "@mantine/form";
import { Select, NumberInput, Button } from "@mantine/core";
import filterStyles from "./filter.module.scss";
import Down from "@/assets/svg/down";

export default function Filter() {
  const form = useForm({
    initialValues: {
      sphere: "",
      salary: {
        from: "",
        to: "",
      },
    },
  });

  return (
    <form className={filterStyles.filter}>
      <section className={filterStyles.filter__header}>
        <span className={filterStyles.filter__headerText}>Фильтры</span>
        <button type="button">
          <span>Сбросить все</span>
          <span>+</span>
        </button>
      </section>
      <section className={filterStyles.filter__main}>
        <div className={filterStyles.filter__sphere}>
          <Select
            data={[]}
            label="Отрасль"
            rightSection={<Down />}
            {...form.getInputProps("sphere")}
          />
        </div>
        <div className={filterStyles.filter__salary}>
          <NumberInput
            placeholder="От"
            label="Оклад"
            {...form.getInputProps("salary.from")}
          />
          <NumberInput placeholder="До" {...form.getInputProps("salary.to")} />
        </div>
      </section>
      <Button type="submit">Применить</Button>
    </form>
  );
}
