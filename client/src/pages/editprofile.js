import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Box, Button } from '@mui/material';
import { useState } from 'react';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const EditProfilePage = () => {
  const { user, changeNicknameError } = useSelector(state => state.user);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const dispatch = useDispatch();
  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      if (!nickname || !nickname.trim()) {
        e.preventDefault();
        return alert('닉네임을 입력해주세요');
      }
      e.preventDefault();
      dispatch({
        type: CHANGE_NICKNAME_REQUEST,
        data: nickname,
      });
    },
    [nickname]
  );

  return (
    <div>
      <Box component="form" onSubmit={onSubmitForm}>
        <Input defaultValue={nickname} onChange={onChangeNickname} />
        {changeNicknameError && <div>이미 사용중인 닉네임입니다.</div>}
        <Button type="submit">확인</Button>
      </Box>
    </div>
  );
};

export default EditProfilePage;
