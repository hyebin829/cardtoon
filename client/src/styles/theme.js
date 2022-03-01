import { createTheme } from '@mui/material';

// const deviceSize = {
//   mobile: '375px',
//   tabletM: '768px',
//   tabletL: '1024px',
//   desktop: '1460px',
// };

// const device = {
//   mobile: `screen and (min-width: ${deviceSize.mobile})`,
//   tabletM: `screen and (min-width: ${deviceSize.tabletM})`,
//   tabletL: `screen and (min-width: ${deviceSize.tabletL})`,
//   desktop: `screen and (min-width: ${deviceSize.desktop})`,
// };

// export const color = createTheme({
//   palette: {
//     primary: {
//       main: '#9163F2',
//       // lightpurple: '#8480F2',
//       // blue: '#30A8F2',
//       // bluegreen: '#32BAD9',
//       // green: '#48D9CA',
//     },
//   },
// });

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
    // blue: '#30A8F2',
    // bluegreen: '#32BAD9',
    // green: '#48D9CA',
  },
});
export default CustomMuiTheme;

// const theme = {
//   // device,
// };

// export default theme;
