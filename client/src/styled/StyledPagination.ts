// styled component for StyledPagination

import styled from "styled-components";
import { StyledButton } from "./StyledControls";

export const StyledPagination = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const StyledPaginationButton = styled(StyledButton)`
  font-size: 0.8rem;
  line-height: 0.1em;
`;
