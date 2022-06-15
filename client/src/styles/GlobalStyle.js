import {createGlobalStyle} from 'styled-components';
const GlobalStyle = createGlobalStyle`

html {
    box-sizing: border-box;
}

*, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Sunflower', sans-serif;
    font-style: normal;
    font-weight: 500;
    margin: 0;
    padding: 0;
}

body {
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
}

`;

export default GlobalStyle;
