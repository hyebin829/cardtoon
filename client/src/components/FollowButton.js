import React, { useCallback } from 'react';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { useDispatch, useSelector } from 'react-redux';

import { FOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const onClickFollowButton = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: post.User.id,
    });
  }, []);

  if (post.User.id === user.id) {
    return null;
  }
  return <StarBorderRoundedIcon onClick={onClickFollowButton} />;
};

export default FollowButton;
