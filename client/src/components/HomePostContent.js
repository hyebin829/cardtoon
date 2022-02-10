import React from 'react';
import { useDispatch } from 'react-redux';
import PostImage from './HomePostImage';

const HomePostContent = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <PostImage images={post.Images} />
      {post.content}
    </div>
  );
};

export default HomePostContent;
