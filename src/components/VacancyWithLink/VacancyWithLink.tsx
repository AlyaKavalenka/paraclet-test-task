import Link from "next/link";
import { IVacancy } from "@/types/types";
import VacancyComp from "../VacancyComp/VacancyComp";

export default function VacancyWithLink(props: { vacancyObj: IVacancy }) {
  const { vacancyObj } = props;

  return (
    <Link href={`/vacancy/${vacancyObj.id}`}>
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
