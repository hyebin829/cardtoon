import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

const LikeButton = ({ post }) => {
  const id = useSelector(state => state.user.user?.id);

  //   const onLike = useCallback(() => {
  //     if (!id) {
  //       return alert('로그인이 필요합니다.');
  //     }
  //     return dispatch({
  //       type: LIKE_POST_REQUEST,
  //       data: post.id,
  //     });
  //   }, [id]);

  //   const onUnLike = useCallback(() => {
  //     if (!id) {
  //       return alert('로그인이 필요합니다.');
  //     }
  //     return dispatch({
  //       type: UNLIKE_POST_REQUEST,
  //       data: post.id,
  //     });
  //   }, [id]);

  return <ThumbUpOutlinedIcon />;
};

export default LikeButton;
