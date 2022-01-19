import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
   *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    letter-spacing: -0.075em;
  }


  h1,h2,h3,h4,h5,h6,p,dl,dt,dd,ol,ul,li,tr,th,td,form,label {
    margin: 0;
    padding: 0;

  }
  ol,
  ul {
    list-style:none;
  }



`;

export default GlobalStyle;
