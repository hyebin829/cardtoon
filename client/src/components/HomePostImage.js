import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const CardCarousel = styled(Carousel)({
  width: '100%',
  height: '100%',
  textAlign: 'center',
});

const CardImg = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('mobile')]: {
    width: '350px',
    height: '350px',
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
  return (
    <CardCarousel
      autoPlay={false}
      next={() => {}}
      prev={() => {}}
      cycleNavigation={false}
      animation="slide"
      swipe={true}
    >
      {images.map((v, i) => (
        <CardImg
          src={`http://localhost:3065/${images[i].src}`}
          key={i}
          draggable={false}
        />
      ))}
    </CardCarousel>
  );
};

export default PostImage;
