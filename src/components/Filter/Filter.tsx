import { useForm } from "@mantine/form";
import { Select, NumberInput, Button } from "@mantine/core";
import { useEffect } from "react";
import filterStyles from "./filter.module.scss";
import Down from "@/assets/svg/down";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCatalogues } from "@/store/Slicers/CataloguesSlice";
import CrossIcon from "@/assets/svg/crossIcon";

export default function Filter() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCatalogues());
  }, [dispatch]);

  const catalogues = useAppSelector((state) => state.cataloguesSlice.value);
  const cataloguesTitles = catalogues.map((item) => item.title_rus);

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
        <button type="button" className={filterStyles.filter__resetBtn}>
          <span>Сбросить все</span>
          <CrossIcon />
        </button>
      </section>
      <section className={filterStyles.filter__main}>
        <div className={filterStyles.filter__sphere}>
          <Select
            data={cataloguesTitles}
            label="Отрасль"
            rightSection={<Down />}
            {...form.getInputProps("sphere")}
          />
        </div>
        <div className={filterStyles.filter__salaryInputs}>
          <NumberInput
            placeholder="От"
            label="Оклад"
            {...form.getInputProps("salary.from")}
            className={filterStyles.filter__numberInput}
          />
          <NumberInput
            placeholder="До"
            {...form.getInputProps("salary.to")}
            className={filterStyles.filter__numberInput}
          />
        </div>
      </section>
      <Button type="submit" className={filterStyles.filter__btn}>
        Применить
      </Button>
    </form>
  );
}
