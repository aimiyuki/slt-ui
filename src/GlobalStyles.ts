import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  background-color: #f8f9fa;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}


#root {
  width: 100%;
}
`;

export default GlobalStyles;
