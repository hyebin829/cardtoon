import { createTheme } from '@mui/material';

const CustomMuiTheme = createTheme({
  // breakpoints: {
  //   keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920,
  //   },
  // },
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
