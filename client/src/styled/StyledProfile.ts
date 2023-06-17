import styled from "styled-components";
import { StyledPage } from "./StyledGlobal";

export const StyledProfile = styled(StyledPage)``;
export const StyledProfileInfo = styled.div`
  width: 32em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
`;
export const StyledProfileItem = styled.span`
  border-radius: 0.5em;
  color: var(--text-primary);
  background-color: var(--bg-primary);
`;
export const StyledProfileValue = styled.span`
  color: var(--text-primary);
  background-color: var(--bg-primary);
`;
