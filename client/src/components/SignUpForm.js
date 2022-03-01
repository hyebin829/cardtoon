import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Box, TextField } from '@mui/material';

import { SIGN_UP_REQUEST } from '../reducers/user';

const SignUpFormWrap = styled.div``;
const SignupButtonWrap = styled.div``;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, user } = useSelector(
    state => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (signUpError) {
    }
  }, [signUpError]);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const inputErrorMessage = useCallback(e => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('필수 입력 칸 입니다.');
    } else if (e.target.validity.tooShort) {
      e.target.setCustomValidity('최소 6자리를 입력해주세요.');
    } else e.target.setCustomValidity('');
  }, []);

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      setPasswordError(e.target.value !== passwordCheck);
    },
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },

    [password]
  );

  const onClickCancle = useCallback(() => {
    navigate('/');
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        setPasswordError(true);
      } else if (password === passwordCheck) {
        setPasswordError(false);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname },
      });
    },
    [email, password, nickname, passwordCheck]
  );
  useEffect(() => {
    if (signUpDone) {
      alert('가입되었습니다.');
      navigate('/');
    }
  }, [signUpDone]);
  return (
    <>
      <Box component="form" onSubmit={onSubmit} sx={{ alignContent: 'center' }}>
        <SignUpFormWrap>
          <TextField
            label="이메일"
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
            onInvalid={inputErrorMessage}
            type="email"
            variant="outlined"
          />
          <TextField
            name="user-nickname"
            label="닉네임"
            value={nickname}
            onChange={onChangeNickname}
            required
            onInvalid={inputErrorMessage}
            maxLength={20}
            variant="outlined"
          />
          <TextField
            name="user-password"
            label="비밀번호"
            value={password}
            onChange={onChangePassword}
            minLength={6}
            maxLength={15}
            required
            onInvalid={inputErrorMessage}
            variant="outlined"
          />
          <TextField
            name="check-user-password"
            label="비밀번호 확인"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            minLength={6}
            maxLength={15}
            onInvalid={inputErrorMessage}
            required
            variant="outlined"
          />
          {passwordError && <div>비밀번호가 일치하지 않습니다</div>}
          {signUpError && <div>{signUpError}</div>}
        </SignUpFormWrap>
        <SignupButtonWrap>
          {passwordError ? (
            <Button disabled>회원가입</Button>
          ) : (
            <Button type="submit" variant="contained">
              회원가입
            </Button>
          )}{' '}
          <Button onClick={onClickCancle}>취소</Button>
        </SignupButtonWrap>
      </Box>
    </>
  );
};

export default SignUpForm;
