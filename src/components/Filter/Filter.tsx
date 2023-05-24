import { useForm } from "@mantine/form";
import { Select, NumberInput, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import filterStyles from "./filter.module.scss";
import Down from "@/assets/svg/down";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCatalogues } from "@/store/Slicers/CataloguesSlice";
import CrossIcon from "@/assets/svg/crossIcon";
import { fetchVacancies } from "@/store/Slicers/VacanciesSlice";
import { FetchVacanciesParams } from "@/types/types";

export default function Filter() {
  const dispatch = useAppDispatch();
  const [formFields, setFormFields] = useState<FetchVacanciesParams>({
    catalogues: "",
    payment_from: "",
    payment_to: "",
  });

  useEffect(() => {
    dispatch(fetchCatalogues());
    dispatch(fetchVacancies(formFields));
  }, [dispatch, formFields]);

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
        setFormFields({
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
            setFormFields({ catalogues: "", payment_from: "", payment_to: "" });
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
