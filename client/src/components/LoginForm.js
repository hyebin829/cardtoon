import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const LoginFormWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #f23054;
  font-size: 15px;
  margin: 5px;
`;

const LoginFormButton = styled(Button)({
  background: '#F29BAB',
});

const InputText = styled(TextField)({
  color: '#F2F2F2',
});

const KakaoImage = styled('img')({
  width: '80px',
  marginTop: '10px',
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logInDone, logInError } = useSelector(state => state.user);

  useEffect(() => {
    if (logInDone) {
      Navigate('/');
    }
  }, [logInDone]);

  useEffect(() => {}, [logInError]);

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: { email, password },
      });
    },
    [email, password]
  );

  return (
    <Box component="form" onSubmit={onSubmitForm}>
      <LoginFormWrap>
        <img src="img/cardtoon.png" />
        <InputText
          label="email"
          type="text"
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
          sx={{ margin: 1 }}
        />
        <InputText
          label="password"
          type="password"
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
        {logInError && <ErrorMessage>{logInError}</ErrorMessage>}
        <LoginFormButton
          type="submit"
          disableElevation
          variant="contained"
          sx={{ mt: 1 }}
        >
          로그인
        </LoginFormButton>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <LoginFormButton
            variant="contained"
            disableElevation
            sx={{ mt: 0.2 }}
          >
            회원가입하기
          </LoginFormButton>
        </Link>
        <a href="http://localhost:3065/user/kakao/login/callback">
          <KakaoImage src="/img/kakao_login_medium.png" />
        </a>
      </LoginFormWrap>
    </Box>
  );
};

export default LoginForm;
