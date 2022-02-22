import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import { Button } from '@mui/material';

const LikeButton = ({ post }) => {
  const id = useSelector(state => state.user.user?.id);
  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find(v => v.id === id);

  return (
    <Button>
      {liked ? (
        <ThumbUpRoundedIcon onClick={onUnLike} />
      ) : (
        <ThumbUpOutlinedIcon onClick={onLike} />
      )}
    </Button>
  );
};

export default LikeButton;
