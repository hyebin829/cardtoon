import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Link, Navigate, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginFormWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Welcome = styled.div`
  display: block;
`;

const ButtonWrap = styled.div``;

const LoginButton = styled.button`
  width: 230px;
  height: 40px;
  background: #ff8464;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  color: white;
  font-weight: 300;
  margin: 23px 0 10px 0;
`;

const SignUpButton = styled.button`
  width: 230px;
  height: 40px;
  background: white;
  border: 1px solid #ff8464;
  border-radius: 20px;
  color: #ff8464;
  font-size: 18px;
  font-weight: 300;
`;

const Form = styled.form``;

const FormWrap = styled.div``;

const FormLabel = styled.label`
  font-size: 18px;
  font-weight: 300;
  float: left;
`;

const Input = styled.input`
  display: inline-block;
  width: 150px;
`;

const FormLabelWrap = styled.div`
  width: 230px;
  margin: 0 auto;
  &:first-child {
    margin-bottom: 10px;
  }
`;

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
    <>
      <LoginFormWrap>
        <Welcome>환영합니다!</Welcome>
        <Form onSubmit={onSubmitForm}>
          <FormWrap>
            <FormLabelWrap>
              <FormLabel htmlFor="user-email">이메일</FormLabel>
              <Input
                type="text"
                name="user-email"
                value={email}
                onChange={onChangeEmail}
                required
              />
            </FormLabelWrap>
            <FormLabelWrap>
              <FormLabel htmlFor="user-password">비밀번호</FormLabel>
              <Input
                type="text"
                name="user-password"
                value={password}
                onChange={onChangePassword}
                required
              />
            </FormLabelWrap>
          </FormWrap>
          <ButtonWrap>
            <LoginButton type="submit">로그인</LoginButton>
            <Link to="/signup">
              <SignUpButton>회원가입 하기</SignUpButton>
            </Link>
          </ButtonWrap>
        </Form>
      </LoginFormWrap>
    </>
  );
};

export default LoginForm;
