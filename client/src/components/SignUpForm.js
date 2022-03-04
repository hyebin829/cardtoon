import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Box, TextField } from '@mui/material';

import { SIGN_UP_REQUEST } from '../reducers/user';

const SignUpFormWrap = styled.div``;
const SignupButtonWrap = styled.div``;

const SignUpWrap = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SignUpTitle = styled.h2`
  text-align: left;
  color: #40101d;
  font-size: 1.5em;
  font-weight: 300;
  margin: 10px 0;
`;

const ErrorMessage = styled.div`
  color: #f23054;
`;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { signUpDone, signUpError } = useSelector(state => state.user);

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
        <SignUpWrap>
          <SignUpTitle>회원가입</SignUpTitle>
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
              sx={{ mb: 1.5 }}
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
              sx={{ mb: 1.5 }}
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
              sx={{ mb: 1.5 }}
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
              sx={{ mb: 1 }}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
            {signUpError && <ErrorMessage>{signUpError}</ErrorMessage>}
          </SignUpFormWrap>
          <SignupButtonWrap sx={{ mt: 1 }}>
            {passwordError ? (
              <Button disabled>회원가입</Button>
            ) : (
              <Button type="submit" variant="contained">
                회원가입
              </Button>
            )}
            <Button onClick={onClickCancle}>취소</Button>
          </SignupButtonWrap>
        </SignUpWrap>
      </Box>
    </>
  );
};

export default SignUpForm;
