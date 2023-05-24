import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IVacancy } from "@/types/types";
import VacancyWithLink from "../VacancyWithLink/VacancyWithLink";

export default function Paginate(props: { data: IVacancy[] }) {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState<IVacancy[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems((data || []).slice(itemOffset, endOffset));
    setPageCount(Math.ceil((data || []).length / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % (data || []).length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems.map((item) => (
        <VacancyWithLink vacancyObj={item} key={item.id} />
      ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
