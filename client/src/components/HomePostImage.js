import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CardCarousel = styled(Carousel)({
  width: '100%',
  height: '100%',
  textAlign: 'center',
});

const CardImg = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('mobile')]: {
    width: '330px',
    height: '330px',
  },
  [theme.breakpoints.up('mobile')]: {
    width: '450px',
    height: '450px',
  },
  [theme.breakpoints.up('tabletM')]: {
    width: '500px',
    height: '500px',
  },
  [theme.breakpoints.up('tabletL')]: {
    width: '650px',
    height: '650px',
  },
}));

const PostImage = ({ images }) => {
  const theme = useTheme();
  const tabletLUp = useMediaQuery(theme.breakpoints.up('tabletL'));

  return (
    <CardCarousel
      autoPlay={false}
      next={() => {}}
      prev={() => {}}
      cycleNavigation={false}
      animation="slide"
      swipe={true}
      navButtonsAlwaysVisible={tabletLUp ? true : false}
      navButtonsProps={{
        style: {
          width: '30px',
          height: '30px',
          color: 'black',
          backgroundColor: 'white',
        },
      }}
    >
      {images.map((v, i) => (
        <CardImg
          src={`/api/${images[i].src}`}
          key={`imagenum${i}`}
          draggable={false}
          alt="post image"
        />
      ))}
    </CardCarousel>
  );
};

export default PostImage;
