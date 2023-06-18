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

  const [pageSizeIndex, setPageSizeIndex] = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState(0);

  const pageSize = pageSizeCollection[pageSizeIndex];
  const totalPages = pageSize ? Math.ceil(totalNumberOfSurveys / pageSize) : 1;

  console.log("total pages", totalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  React.useEffect(() => {
    console.log(totalNumberOfSurveys, pageSize, pages);

    handlePageChange(selectedPage * pageSize, pageSize);
  }, [selectedPage, pageSize]);

  const handlePageSizeChange = (selectedPageSizeIndex: number) => {
    setPageSizeIndex(selectedPageSizeIndex);
    setSelectedPage(0); // reset to first page when changing page size
  };

  return (
    <StyledPagination>
      <StyledPaginationContainer>
        {pageSizeCollection?.map((page, i) => (
          <StyledPaginationButton
            key={page}
            onClick={() => handlePageSizeChange(i)}
          >
            {page === 0 ? "All" : page}
          </StyledPaginationButton>
        ))}
      </StyledPaginationContainer>
      <StyledPaginationContainer>
        {pages.map((i) => (
          <StyledPaginationButton
            key={i}
            disabled={selectedPage === i}
            onClick={() => setSelectedPage(i)}
          >
            {i}
          </StyledPaginationButton>
        ))}
      </StyledPaginationContainer>
    </StyledPagination>
  );
};

export default Pagination;
