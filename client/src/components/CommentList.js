import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Menu, MenuItem, Divider, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import CommentMoreButton from './CommentMoreButton';

const CommentList = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.user?.id);

  return (
    <List>
      {post.Comments.map(comment => (
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemText
            primary={comment.User.nickname}
            secondary={comment.content}
          />
          <CommentMoreButton comment={comment} />
        </ListItem>
      ))}
      <Divider variant="middle" component="li" />
    </List>
  );
};
export default CommentList;
