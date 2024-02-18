import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset de estilos */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Estilos globais */
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }

  /* Adicione outros estilos globais conforme necessário */
`;

export default GlobalStyle;
