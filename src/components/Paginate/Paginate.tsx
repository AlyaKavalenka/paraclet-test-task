import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IVacancy } from "@/types/types";
import VacancyWithLink from "../VacancyWithLink/VacancyWithLink";
import paginateStyles from "./paginate.module.scss";
import Arrow from "@/assets/svg/arrow";

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
        <VacancyWithLink
          vacancyObj={item}
          key={item.id}
          data-elem={`vacancy-${item.id}`}
        />
      ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<Arrow />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<Arrow />}
        renderOnZeroPageCount={null}
        containerClassName={paginateStyles.paginate}
        pageClassName={paginateStyles.paginate__page}
        previousClassName={paginateStyles.paginate__prevPage}
        nextClassName={paginateStyles.paginate__nextPage}
        activeClassName={paginateStyles.paginate__active}
        disabledClassName={paginateStyles.paginate__disabled}
      />
    </>
  );
}
