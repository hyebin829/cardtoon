import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector } from 'react-redux';

const PostImage = ({ images }) => {
  return (
    <Carousel
      autoPlay={false}
      next={() => {}}
      prev={() => {}}
      cycleNavigation={false}
      animation="slide"
    >
      {images.map((v, i) => (
        <img
          src={`http://localhost:3065/${images[i].src}`}
          height="360px"
          width="100%"
          key={i}
        />
      ))}
    </Carousel>
  );
};

export default PostImage;
