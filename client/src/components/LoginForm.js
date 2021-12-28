import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Link, Navigate, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginFormWrap = styled.div``;
const ButtonWrap = styled.div``;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, logInDone } = useSelector(state => state.user);

  useEffect(() => {
    if (logInDone) {
      Navigate('/');
    }
  }, [logInDone]);

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
      환영합니다!
      <LoginFormWrap>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="user-email">이메일</label>
          <input
            type="text"
            name="user-email"
            value={email}
            onChange={onChangeEmail}
          />
          <label htmlFor="user-password">비밀번호</label>
          <input
            type="text"
            name="user-password"
            value={password}
            onChange={onChangePassword}
          />{' '}
          <ButtonWrap>
            <button type="submit">로그인</button>
            <Link to="/signup">
              <button>회원가입 하기</button>
            </Link>
          </ButtonWrap>
        </form>
      </LoginFormWrap>
    </>
  );
};

export default LoginForm;
