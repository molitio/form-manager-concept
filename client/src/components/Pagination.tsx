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
  const [pages, setPages] = React.useState([0]);

  React.useEffect(() => {
    const handle = () => {
      const pageSize = pageSizeCollection[pageSizeIndex];
      const totalPages = pageSize
        ? Math.ceil(totalNumberOfSurveys / pageSize) + 1
        : 1;

      console.log("total pages", totalPages);
      const pagesArray = new Array(totalPages);

      console.log("pages array", pagesArray);
      const pages = pagesArray.map((page) => (page = page++));

      setPages(pages);
      console.log("pages", pages);
      console.log(totalNumberOfSurveys, pageSize, pages);

      handlePageChange(selectedPage * pageSize, pageSize);
    };
    handle();
  }, [pageSizeIndex]);

  React.useEffect(() => {
    handlePageChange(
      selectedPage * pageSizeCollection[pageSizeIndex],
      pageSizeCollection[pageSizeIndex]
    );
  }, [selectedPage]);

  const handlePageSizeChange = (selectedPageSizeIndex: number) => {
    setPageSizeIndex(selectedPageSizeIndex);
    setSelectedPage(0);
    handlePageChange(
      selectedPage * pageSizeCollection[pageSizeIndex],
      pageSizeCollection[pageSizeIndex]
    );
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
        {pages.map((page) => (
          <StyledPaginationButton
            key={page}
            disabled={selectedPage === page}
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </StyledPaginationButton>
        ))}
      </StyledPaginationContainer>
    </StyledPagination>
  );
};

export default Pagination;
