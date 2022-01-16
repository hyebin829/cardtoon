const deviceSize = {
  mobile: '375px',
  tabletM: '768px',
  tabletL: '1024px',
  desktop: '1460px',
};

const device = {
  mobile: `screen and (min-width: ${deviceSize.mobile})`,
  tabletM: `screen and (min-width: ${deviceSize.tabletM})`,
  tabletL: `screen and (min-width: ${deviceSize.tabletL})`,
  desktop: `screen and (min-width: ${deviceSize.desktop})`,
};

const theme = {
  device,
};

export default theme;
