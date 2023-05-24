export interface ICatalogues {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: [
    {
      title_rus: string;
      url_rus: string;
      title: string;
      id_parent: number;
      key: number;
    }
  ];
}

export interface IVacancy {
  id: number;
  catalogues: ICatalogues;
  profession: string;
  firmName: string;
  town: {
    title: string;
  };
  type_of_work: {
    title: string;
  };
  payment_to: number;
  payment_from: number;
  currency: string;
  vacancyRichText: string;
}

export interface IVacancies {
  objects: IVacancy[];
}

export interface FetchVacanciesParams {
  catalogues?: string;
  payment_from?: string;
  payment_to?: string;
}
