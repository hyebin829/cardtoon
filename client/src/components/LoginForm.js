import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Link, Router } from 'react-router-dom';

const LoginFormWrap = styled.div``;
const ButtonWrap = styled.div``;

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      환영합니다!
      <LoginFormWrap>
        <label htmlFor="user-id">아이디</label>
        <input type="text" name="user-id" value={id} onChange={setId} />
        <label htmlFor="user-password">비밀번호</label>
        <input
          type="text"
          name="user-password"
          value={password}
          onChange={setPassword}
        />
      </LoginFormWrap>
      <ButtonWrap>
        <button type="submit">로그인</button>
        <Link to="/signup">회원가입 하기</Link>
      </ButtonWrap>
    </>
  );
};

export default LoginForm;
