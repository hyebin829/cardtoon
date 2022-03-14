import React from 'react';
import { useCallback, useState } from 'react';

import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_COMMENT_REQUEST } from '../reducers/post';
import { useEffect } from 'react';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.user?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
    state => state.post
  );
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitForm = useCallback(
    e => {
      if (!commentText || !commentText.trim()) {
        e.preventDefault();
        return alert('내용을 입력해주세요');
      }
      e.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, postId: post.id, userId: id },
      });
    },
    [commentText, id]
  );

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  return (
    <form style={{ margin: '5px 15px' }} onSubmit={onSubmitForm}>
      <TextField
        multiline
        fullWidth
        maxRows={2}
        value={commentText}
        onChange={onChangeCommentText}
      ></TextField>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button type="submit">확인</Button>
      </Box>
    </form>
  );
};

export default CommentForm;
