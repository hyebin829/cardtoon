import { createTheme } from '@mui/material';

const CustomMuiTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 450,
      tabletM: 768,
      tabletL: 1024,
      desktop: 1460,
    },
  },
  palette: {
    primary: {
      main: '#F23054',
    },
    secondary: {
      main: '#F26B83',
    },
  },
  typography: {
    fontSize: 15,
    body1: {
      letterSpacing: '-0.075em',
    },
    button: {
      letterSpacing: '-0.075em',
    },
  },
});
export default CustomMuiTheme;
