import { useForm } from "@mantine/form";
import { Select, NumberInput, Button } from "@mantine/core";
import { useEffect } from "react";
import filterStyles from "./filter.module.scss";
import Down from "@/assets/svg/down";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCatalogues } from "@/store/Slicers/CataloguesSlice";
import CrossIcon from "@/assets/svg/crossIcon";
import { FetchVacanciesParams } from "@/types/types";

interface IFilterProps {
  updateFilter: (value: FetchVacanciesParams) => void;
}

export default function Filter(pros: IFilterProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCatalogues());
  }, [dispatch]);

  const { updateFilter } = pros;
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
    <form
      className={filterStyles.filter}
      onSubmit={form.onSubmit((value) => {
        const keyFromSphere = catalogues.find(
          (item) => item.title_rus === value.sphere
        );
        updateFilter({
          catalogues: keyFromSphere ? keyFromSphere.key.toString() : "",
          payment_from: value.salary.from.toString() || "",
          payment_to: value.salary.to.toString() || "",
        });
      })}
    >
      <section className={filterStyles.filter__header}>
        <span className={filterStyles.filter__headerText}>Фильтры</span>
        <button
          type="button"
          className={filterStyles.filter__resetBtn}
          onClick={() => {
            form.reset();
            updateFilter({
              catalogues: "",
              payment_from: "",
              payment_to: "",
              keyword: "",
            });
          }}
        >
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
