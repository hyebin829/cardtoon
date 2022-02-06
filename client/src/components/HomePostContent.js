import React from 'react';
import { useDispatch } from 'react-redux';

const HomePostContent = ({ post }) => {
  const dispatch = useDispatch();
  return <div> {post.content}</div>;
};

export default HomePostContent;
