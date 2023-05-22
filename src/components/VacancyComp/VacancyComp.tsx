/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from "next/router";
import LocationIcon from "@/assets/svg/locationIcon";
import StarIcon from "@/assets/svg/starIcon";
import { IVacancy } from "@/types/types";
import vacancyCompStyles from "./vacancyComp.module.scss";
import vacancyPageStyles from "../../pages/vacancy/vacancy.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewFavorite } from "@/store/Slicers/FavoritesSlice";

export default function VacancyComp(props: IVacancy) {
  const {
    payment_from,
    payment_to,
    currency,
    profession,
    type_of_work,
    town,
    id,
    catalogues,
    firmName,
    vacancyRichText,
  } = props;
  const currentPatch = useRouter().pathname;
  const dispatch = useAppDispatch();
  const faveArray = useAppSelector((state) => state.favorites.value);

  const isFave = faveArray.findIndex((item) => item.id === id);

  let currentStyle;

  if (currentPatch === "/vacancy/[vacancyid]") {
    currentStyle = vacancyPageStyles;
  } else {
    currentStyle = vacancyCompStyles;
  }

  let salary;
  if (payment_from && payment_to) {
    salary = `з/п ${payment_from} - ${payment_to} ${currency}`;
  } else if (payment_from && !payment_to) {
    salary = `з/п от ${payment_from} ${currency}`;
  } else if (!payment_from && payment_to) {
    salary = `з/п от ${payment_to} ${currency}`;
  } else {
    salary = "";
  }

  return (
    <article className={vacancyCompStyles.vacancy}>
      <section className={vacancyCompStyles.vacancy__info}>
        <span className={currentStyle.vacancy__proff}>{profession}</span>
        {salary && (
          <section className={vacancyCompStyles.vacancy__salaryNType}>
            <span className={currentStyle.vacancy__text_salary}>{salary}</span>
            <span className={vacancyCompStyles.vacancy__text_dot}>•</span>
            {type_of_work.title && (
              <span className={currentStyle.vacancy__text}>
                {type_of_work.title}
              </span>
            )}
          </section>
        )}
        {town.title && (
          <section className={vacancyCompStyles.vacancy__location}>
            <LocationIcon />
            <span className={vacancyCompStyles.vacancy__text}>
              {town.title}
            </span>
          </section>
        )}
      </section>
      <aside>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              addNewFavorite({
                id,
                catalogues,
                profession,
                firmName,
                town,
                type_of_work,
                payment_to,
                payment_from,
                currency,
                vacancyRichText,
              })
            );
          }}
          className={vacancyCompStyles.vacancy__btn}
        >
          <StarIcon mode={isFave !== -1 ? "full" : "empty"} />
        </button>
      </aside>
    </article>
  );
}
