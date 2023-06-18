import React from "react";
import { StyledPagination, StyledPaginationButton } from "../styled";

interface PaginationProps {
  pageSize: number;
  total: number;
  skip: number;
  pageSizeCollection: number[];
  handlePageChange: (skip: number, limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { pageSizeCollection, pageSize, total, skip, handlePageChange } = props;

  /*   const pages = Math.ceil(total / pageSize);
  const currentPage = skip / pageSize + 1;
 */
  return (
    <StyledPagination>
      {pageSizeCollection?.map((page) => (
        <StyledPaginationButton
          key={page}
          /* disabled={currentPage === page} */
          onClick={() =>
            handlePageChange(
              pageSizeCollection[page - 1] * pageSize,
              pageSizeCollection[page]
            )
          }
        >
          {page === 0 ? "All" : page}
        </StyledPaginationButton>
      ))}
    </StyledPagination>
  );
};

export default Pagination;
