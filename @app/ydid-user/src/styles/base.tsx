import { createGlobalStyle } from 'styled-components';

export const NormalizeStyles = createGlobalStyle`
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  main {
    display: block;
  }
  #root {
    padding: unset;
    min-height: "100vh"
  }
`;
