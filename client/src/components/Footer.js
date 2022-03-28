import React from 'react';

import { Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';

const FooterBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tabletM')]: {
    padding: '10px 70px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '20px 120px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '30px 400px',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const tabletLUp = useMediaQuery(theme.breakpoints.up('tabletL'));

  return tabletLUp ? (
    <FooterBox
      sx={{
        height: '130px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: 1,
        borderColor: '#F2F0F0',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: '20px 20px 20px 50px',
          color: '#F26B83',
          display: 'inline-block',
        }}
      >
        CARDTOON
      </Typography>
      <Typography
        sx={{
          color: '#F26B83',

          margin: '20px',
          display: 'inline-block',
        }}
      >
        contact : smilerain779@gmail.com
      </Typography>
    </FooterBox>
  ) : (
    ''
  );
};

export default Footer;
