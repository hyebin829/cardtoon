import React from 'react';
import { useDispatch } from 'react-redux';
import PostImage from './HomePostImage';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Menu, MenuItem, Stack } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentForm from './CommentForm';

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
