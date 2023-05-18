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
