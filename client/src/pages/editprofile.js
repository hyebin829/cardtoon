import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Input, Box, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import {
  CHANGE_NICKNAME_REQUEST,
  UPLOAD_PROFILE_IMAGE_REQUEST,
} from '../reducers/user';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ImageInput = styled.input`
  display: none;
`;

const EditProfilePage = () => {
  const { user, changeNicknameError, profileImagePath } = useSelector(
    state => state.user
  );
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

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    return dispatch({
      type: UPLOAD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  return (
    <>
      {user?.profileimagesrc === null ? (
        <AccountCircleIcon sx={{ width: 120, height: 120 }} />
      ) : (
        <Avatar
          src={`http://localhost:3065/${user?.profileimagesrc}`}
          sx={{ width: 120, height: 120 }}
        />
      )}
      <label>
        <ImageInput
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          name="image"
          onChange={onChangeImages}
          formEncType="multipart/form-data"
        />
        <Button variant="contained" component="span">
          변경
        </Button>
      </label>
      <Box component="form" onSubmit={onSubmitForm}>
        <Input defaultValue={nickname} onChange={onChangeNickname} />
        {changeNicknameError && <div>이미 사용중인 닉네임입니다.</div>}
        <Button type="submit">확인</Button>
      </Box>
    </>
  );
};

export default EditProfilePage;
