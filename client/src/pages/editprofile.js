import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainMenu from '../components/MenuBar';
import styled from 'styled-components';
import { Input, Box, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import {
  CHANGE_NICKNAME_REQUEST,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  LOAD_USER_INFO_REQUEST,
} from '../reducers/user';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardtoonAppBar from '../components/CardtoonAppBar';

const ImageInput = styled.input`
  display: none;
`;

const ChangeErrorMessage = styled.div`
  color: #f23054;
  margin-top: 2px;
`;

const EditProfilePage = () => {
  const {
    user,
    changeNicknameError,
    profileImagePath,
    changeNicknameDone,
    userProfile,
  } = useSelector(state => state.user);

  const [nickname, setNickname] = useState(user?.nickname);

  const dispatch = useDispatch();
  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
  }, [profileImagePath, nickname, userProfile]);

  const onSubmitForm = useCallback(
    e => {
      if (!nickname || !nickname.trim()) {
        e.preventDefault();
        return alert('닉네임을 입력해주세요');
      } else {
        e.preventDefault();
        dispatch({
          type: CHANGE_NICKNAME_REQUEST,
          data: nickname,
        });
      }
    },
    [nickname]
  );

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    if (e.target.files.length > 1) {
      alert('변경 실패 : 한 장의 사진만 가능합니다.');
    } else {
      const imageFormData = new FormData();

      [].forEach.call(e.target.files, f => {
        imageFormData.append('image', f);
      });
      dispatch({
        type: UPLOAD_PROFILE_IMAGE_REQUEST,
        data: imageFormData,
      });
      alert('변경되었습니다.');
    }
  }, []);

  return user !== null ? (
    <>
      <CardtoonAppBar />
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
          <Input defaultValue={user?.nickname} onChange={onChangeNickname} />

          <Button type="submit" variant="contained" sx={{ marginLeft: '5px' }}>
            확인
          </Button>
          {changeNicknameError && (
            <ChangeErrorMessage>이미 사용중인 닉네임입니다.</ChangeErrorMessage>
          )}
          {changeNicknameDone && <div>변경되었습니다</div>}
        </Box>
      </Box>
      <MainMenu />
    </>
  ) : (
    ''
  );
};

export default EditProfilePage;
