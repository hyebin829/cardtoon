import React, { useCallback } from 'react';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useDispatch, useSelector } from 'react-redux';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { Button } from '@mui/material';

const FollowDeleteButton = ({ userid }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const onClickButton = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: userid,
    });
  }, [userid]);

  return (
    <>
      <Button onClick={onClickButton} sx={{ paddingTop: '10px' }}>
        <DeleteRoundedIcon />
      </Button>
    </>
  );
};

export default FollowDeleteButton;
