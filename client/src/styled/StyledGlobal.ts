import styled, { createGlobalStyle } from "styled-components";

export const StyledGlobal = createGlobalStyle`
:root{
  --text-primary: #8EBCC7;
  --text-secondary: #00302c;
  --text-error: red;
  --bg-primary: #192021;
  --bg-secondary: #779fa8;
}

body {
  background-color: var(--bg-primary);
  font-size: 16px;
  font-family: "Gill Sans";
  color: var(--text-primary);
  margin: 0;
  padding: 0;
}
`;

export const StyledPage = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;
