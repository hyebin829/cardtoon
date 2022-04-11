import React, { useCallback } from 'react';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { useDispatch, useSelector } from 'react-redux';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { Button } from '@mui/material';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const Followed = user?.Followings.find(v => v?.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (Followed) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [Followed]);

  if (post.User.id === user?.id) {
    return null;
  }
  return (
    <>
      <Button
        onClick={onClickButton}
        sx={{ paddingTop: '10px' }}
        aria-label="follow button"
      >
        {Followed ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
      </Button>
    </>
  );
};

export default FollowButton;
