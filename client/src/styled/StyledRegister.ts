import styled from "styled-components";
import { StyledPage } from "./StyledGlobal";

export const StyledRegister = styled(StyledPage)`
  margin: 5em 0 0 0;
  justify-content: flex-start;
`;

export const StyledRegisterForm = styled.form`
  width: 32em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
`;

export const StyledRegisterFormLabel = styled.label``;
export const StyledRegisterFormButton = styled.button`
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  border: 1px solid var(--bg-primary);
  border-radius: 0.5em;
  padding: 0.5em;
  grid-column: 1 / span 2;
`;

export const StyledRegisterFormInput = styled.input`
  padding: 0.5em;
  border-radius: 0.5em;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--bg-secondary);
`;
