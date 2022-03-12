import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import { Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import CommentMoreButton from './CommentMoreButton';

import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

const CommentList = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.user?.id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  return (
    <>
      <Button onClick={onToggleComment}>
        {post.Comments.length} <InsertCommentOutlinedIcon />
      </Button>

      {commentFormOpened ? (
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
      ) : (
        ''
      )}
    </>
  );
};
export default CommentList;
