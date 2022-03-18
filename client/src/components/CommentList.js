import { List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import CommentMoreButton from './CommentMoreButton';
import CommentForm from './CommentForm';

import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

const CommentList = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.user?.id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { removeCommentLoading, addCommentLoading } = useSelector(
    state => state.post
  );

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  return (
    post.Comments && (
      <>
        <Button onClick={onToggleComment} sx={{ pr: 0, minWidth: '50px' }}>
          <InsertCommentOutlinedIcon sx={{ width: '100%' }} />
        </Button>
        {post?.Comments?.length}
        {commentFormOpened ? (
          <>
            <CommentForm post={post} />
            <List>
              {post?.Comments?.map(comment => (
                <ListItem
                  alignItems="flex-start"
                  sx={{ padding: '10px 20px' }}
                  key={comment.id}
                >
                  <ListItemText
                    primary={comment.User.nickname}
                    secondary={comment.content}
                  />
                  <CommentMoreButton comment={comment} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          ''
        )}
      </>
    )
  );
};
export default CommentList;
