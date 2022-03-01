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

// const ButtonWrap = styled.div``;

const LoginFormButton = styled(Button)({
  background: '#F29BAB',
});

const InputText = styled(TextField)({
  color: '#F2F2F2',
});

// const SignUpButton = styled.button`
//   width: 230px;
//   height: 40px;
//   background: white;
//   border: 1px solid #ff8464;
//   border-radius: 20px;
//   color: #ff8464;
//   font-size: 18px;
//   font-weight: 300;
// `;

// const FormWrap = styled.div``;

// const FormLabel = styled.label`
//   font-size: 18px;
//   font-weight: 300;
//   float: left;
// `;

// const Input = styled.input`
//   display: inline-block;
//   width: 150px;
// `;

// const FormLabelWrap = styled.div`
//   width: 230px;
//   margin: 0 auto;
//   &:first-child {
//     margin-bottom: 10px;
//   }
// `;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, logInDone, logInError } = useSelector(state => state.user);

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
      console.log(email, password);
      console.log('로그인버튼클릭');
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
        <LoginFormButton type="submit" variant="contained" sx={{ mt: 1 }}>
          로그인
        </LoginFormButton>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <LoginFormButton variant="contained" sx={{ mt: 0.2 }}>
            회원가입하기
          </LoginFormButton>
        </Link>
      </LoginFormWrap>
    </Box>
  );
};

export default LoginForm;
