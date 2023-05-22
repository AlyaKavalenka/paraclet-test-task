import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { IVacancy } from "@/types/types";
import { clickedVacancy } from "@/store/Slicers/ClickedVacancySlice";
import VacancyComp from "../VacancyComp/VacancyComp";

export default function VacancyWithLink(props: { vacancyObj: IVacancy }) {
  const dispatch = useAppDispatch();
  const { vacancyObj } = props;

  return (
    <Link
      href={`/vacancy/${vacancyObj.id}`}
      onClick={() => dispatch(clickedVacancy(vacancyObj))}
    >
      <VacancyComp
        id={vacancyObj.id}
        catalogues={vacancyObj.catalogues}
        profession={vacancyObj.profession}
        firmName={vacancyObj.firmName}
        town={{
          title: vacancyObj.town.title,
        }}
        type_of_work={{
          title: vacancyObj.type_of_work.title,
        }}
        payment_to={vacancyObj.payment_to}
        payment_from={vacancyObj.payment_from}
        currency={vacancyObj.currency}
        vacancyRichText={vacancyObj.vacancyRichText}
      />
    </Link>
  );
}
