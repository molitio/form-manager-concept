import { createGlobalStyle } from "styled-components";

export const StyledGlobal = createGlobalStyle`
:root{
  --text-primary: #192021;
  --text-secondary: #779fa8;
  --bg-primary: #8EBCC7;
  --bg-secondary: #00302c;

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
