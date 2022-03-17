import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Link, Navigate, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { color } from '../styles/theme';

const LoginFormWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  display: block;
  font-size: 30px;
  color: #f23054;
  font-weight: 600;
`;

const LoginFormButton = styled(Button)({
  background: '#F29BAB',
});

const InputText = styled(TextField)({
  color: '#F2F2F2',
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

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

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
        <Title>CARDTOON</Title>
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
      </LoginFormWrap>
    </Box>
  );
};

export default LoginForm;
