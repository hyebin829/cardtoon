import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
   *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    letter-spacing: -0.075em;   
    margin: 0;
    padding: 0;
  }


  h1,h2,h3,h4,h5,h6,p,dl,dt,dd,ol,ul,li,tr,th,td,form,label {


  }
  ol,
  ul {
    list-style:none;
  }



`;

export default GlobalStyle;
