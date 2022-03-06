import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainMenu from '../components/MenuBar';
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

const ChangeErrorMessage = styled.div`
  color: #f23054;
  margin-top: 2px;
`;

const EditProfilePage = () => {
  const { user, changeNicknameError, profileImagePath } = useSelector(
    state => state.user
  );
  const [nickname, setNickname] = useState(user?.nickname);
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '200px',
        }}
      >
        {user?.profileimagesrc === null ? (
          <AccountCircleIcon sx={{ width: 130, height: 130 }} />
        ) : (
          <Avatar
            src={`http://localhost:3065/${user?.profileimagesrc}`}
            sx={{ width: 130, height: 130 }}
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
          <Button
            variant="outlined"
            component="span"
            sx={{ marginTop: '10px' }}
          >
            프로필 사진 변경
          </Button>
        </label>
        <Box
          component="form"
          onSubmit={onSubmitForm}
          sx={{ marginTop: '10px' }}
        >
          <Input defaultValue={nickname} onChange={onChangeNickname} />
          {changeNicknameError && (
            <ChangeErrorMessage>이미 사용중인 닉네임입니다.</ChangeErrorMessage>
          )}
          <Button type="submit" variant="contained" sx={{ marginLeft: '5px' }}>
            확인
          </Button>
        </Box>
      </Box>
      <MainMenu />
    </>
  );
};

export default EditProfilePage;
