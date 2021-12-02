import { useCallback, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Link, Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

const LoginFormWrap = styled.div``;
const ButtonWrap = styled.div``;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback(e => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ id, password }));
    console.log(id, password);
  }, [id, password]);

  return (
    <>
      환영합니다!
      <LoginFormWrap>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="user-id">아이디</label>
          <input type="text" name="user-id" value={id} onChange={onChangeId} />
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
