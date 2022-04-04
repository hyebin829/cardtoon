import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Box, TextField, Stack } from '@mui/material';

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
  font-size: 15px;
  margin-bottom: 10px;
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
  const [emailError, setEmailError] = useState(false);
  const [emailValueLengthError, setEmailValueLengthError] = useState(false);
  const [nicknameValueLengthError, setNicknameValueLengthError] =
    useState(false);
  const [passwordValueLengthError, setPasswordValueLengthError] =
    useState(false);
  const [checkBlank, setCheckBlank] = useState(false);

  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
      const regExp = /[^a-zA-Z0-9]/gi;
      regExp.test(e.target.value) ? setEmailError(true) : setEmailError(false);
      e.target.value.length < 6 || e.target.value.length > 15
        ? setEmailValueLengthError(true)
        : setEmailValueLengthError(false);
    },
    [email]
  );

  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
    const regExp = /[ 　]/gi;
    regExp.test(e.target.value) ? setCheckBlank(true) : setCheckBlank(false);
    e.target.value.length < 3 || e.target.value.length > 15
      ? setNicknameValueLengthError(true)
      : setNicknameValueLengthError(false);
  }, []);

  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      setPasswordError(e.target.value !== passwordCheck);
      e.target.value.length > 15
        ? setPasswordValueLengthError(true)
        : setPasswordValueLengthError(false);
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
            <Stack>
              <TextField
                label="아이디"
                name="user-email"
                value={email}
                onChange={onChangeEmail}
                required
                maxLength={15}
                minLength={6}
                variant="outlined"
                sx={{ mb: 1.5, display: 'inline-block' }}
              />
              {emailError && (
                <ErrorMessage>영문,숫자만 가능합니다.</ErrorMessage>
              )}
              {emailValueLengthError && (
                <ErrorMessage>
                  6글자 이상 15글자 이하로 작성해주세요.
                </ErrorMessage>
              )}
              <TextField
                name="user-nickname"
                label="닉네임"
                value={nickname}
                onChange={onChangeNickname}
                required
                maxLength={15}
                variant="outlined"
                sx={{ mb: 1.5 }}
              />
              {nicknameValueLengthError && (
                <ErrorMessage>
                  2글자 이상 15글자 이하로 작성해주세요.
                </ErrorMessage>
              )}
              {checkBlank && (
                <ErrorMessage>공백문자는 입력 불가능합니다.</ErrorMessage>
              )}
              <TextField
                name="user-password"
                label="비밀번호"
                value={password}
                onChange={onChangePassword}
                minLength={6}
                maxLength={15}
                required
                variant="outlined"
                sx={{ mb: 1.5 }}
                type="password"
              />
              {passwordValueLengthError && (
                <ErrorMessage>15글자 이하로 작성해주세요.</ErrorMessage>
              )}
              <TextField
                name="check-user-password"
                label="비밀번호 확인"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                minLength={6}
                maxLength={15}
                type="password"
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />
              {passwordError && (
                <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
              )}
              {signUpError && <ErrorMessage>{signUpError}</ErrorMessage>}
            </Stack>
          </SignUpFormWrap>
          <SignupButtonWrap sx={{ mt: 1 }}>
            {passwordError ||
            emailError ||
            emailValueLengthError ||
            nicknameValueLengthError ||
            checkBlank ? (
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
