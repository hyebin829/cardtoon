import React from 'react';
import Carousel from 'react-material-ui-carousel';

const dummyimages = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];

const PostImage = () => {
  return (
    <Carousel
      autoPlay={false}
      next={() => {}}
      prev={() => {}}
      cycleNavigation={false}
      animation="slide"
    >
      {dummyimages.map(v => (
        <img src={v} height="360px" width="100%" />
      ))}
    </Carousel>
  );
};

export default PostImage;
