import styled from "styled-components";

export const StyledForm = styled.form`
  width: 32em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
`;

export const StyledFormLabel = styled.label``;
export const StyledFormButton = styled.button`
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  border: 1px solid var(--bg-primary);
  border-radius: 0.5em;
  padding: 0.5em;
  grid-column: 1 / span 2;
`;

export const StyledFormInput = styled.input`
  padding: 0.5em;
  border-radius: 0.5em;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--bg-secondary);
`;

export const StyledFormTextArea = styled.textarea`
  padding: 0.5em;
  border-radius: 0.5em;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--bg-secondary);
  resize: vertical;
  grid-column: 1 / span 2;
  &:focus {
    outline: none;
    border: 2px solid var(--bg-secondary);
  }
`;
