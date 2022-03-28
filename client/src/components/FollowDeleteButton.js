import React, { useCallback } from 'react';

import { Button } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useDispatch } from 'react-redux';

import { UNFOLLOW_REQUEST } from '../reducers/user';

function FollowDeleteButton({ userid }) {
  const dispatch = useDispatch();

  const onClickButton = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: userid,
    });
  }, [userid]);

  return (
    <Button onClick={onClickButton} sx={{ paddingTop: '10px' }}>
      <DeleteRoundedIcon />
    </Button>
  );
}

export default FollowDeleteButton;
