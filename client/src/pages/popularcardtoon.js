import React from 'react';
import MenuBar from '../components/MenuBar';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_HOTPOSTS_REQUEST } from '../reducers/post';

const PopularCardtoonPage = () => {
  const { hotPosts } = useSelector(state => state.post);
  console.log(hotPosts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_HOTPOSTS_REQUEST,
    });
  }, []);

  return (
    <>
      <div>PopularCardtoonPage.</div>
      <MenuBar />
    </>
  );
};

export default PopularCardtoonPage;
