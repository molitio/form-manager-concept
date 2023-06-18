import React from "react";
import {
  StyledPagination,
  StyledPaginationButton,
  StyledPaginationContainer,
} from "../styled";

interface PaginationProps {
  pageSizeCollection: number[];
  totalNumberOfSurveys: number;
  handlePageChange: (skip: number, limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { pageSizeCollection, handlePageChange, totalNumberOfSurveys } = props;

  const [pageSize, setPageSize] = React.useState(0);
  const [pageSizeIndex, setPageSizeIndex] = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState(0);

  const pages = Math.ceil(
    totalNumberOfSurveys / pageSizeCollection[pageSizeIndex]
  );
  /*   const currentPage = skip / pageSize + 1; */

  React.useEffect(() => {
    handlePageChange(selectedPage * pageSize, pageSize);
  }, [selectedPage]);

  const handlePageSizeChange = (
    pageSize: number,
    selectedPageIndex: number
  ) => {
    setPageSizeIndex(selectedPageIndex);
  };

  const handleSetCurrentPage = (currentPage: number) => {
    setSelectedPage(currentPage);
  };

  return (
    <StyledPagination>
      <StyledPaginationContainer>
        {pageSizeCollection?.map((page, i) => (
          <StyledPaginationButton
            key={page}
            /* disabled={currentPage === page} */
            onClick={() => handlePageSizeChange(page, i)}
          >
            {page === 0 ? "All" : page}
          </StyledPaginationButton>
        ))}
      </StyledPaginationContainer>
      <StyledPaginationContainer>
        {Array.from({ length: pages }, (_, i) => i + 1).map((page, i) => (
          <StyledPaginationButton
            key={page}
            /* disabled={currentPage === page} */
            onClick={() => handleSetCurrentPage(page)}
          >
            {page === 0 ? "" : page}
          </StyledPaginationButton>
        ))}
      </StyledPaginationContainer>
    </StyledPagination>
  );
};

export default Pagination;
