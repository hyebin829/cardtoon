import React, { useCallback } from 'react';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { useDispatch, useSelector } from 'react-redux';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { Button } from '@mui/material';

const ListButton = ({ userid }) => {
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
        <StarRoundedIcon />
      </Button>
    </>
  );
};

export default ListButton;
