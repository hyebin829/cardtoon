import React, { useCallback } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

import { useSelector, useDispatch } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const LikeCount = styled('div')({
  display: 'inline-block',
  verticalAlign: 'middle',
});

const LikeButton = ({ post }) => {
  const id = useSelector(state => state.user.user?.id);
  const homePosts = useSelector(state => state.post);
  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id, homePosts]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id, homePosts]);

  const liked = post.Likers.find(v => v.id === id);

  return (
    <>
      <Button
        sx={{
          mt: '10px',
          display: 'inline-block',
          paddingLeft: '10px',
          minWidth: '50px',
        }}
        aria-label="like button"
      >
        {liked ? (
          <ThumbUpRoundedIcon onClick={onUnLike} sx={{ width: '100%' }} />
        ) : (
          <ThumbUpOutlinedIcon onClick={onLike} sx={{ width: '100%' }} />
        )}
      </Button>
      <LikeCount>{post.Likers.length}</LikeCount>
    </>
  );
};

export default LikeButton;
