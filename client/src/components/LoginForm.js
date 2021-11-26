import { useState } from 'react';
import styled from 'styled-components';

const LoginFormWrap = styled.div``;
const ButtonWrap = styled.div``;

const LoginForm = () => {
  return (
    <>
      환영합니다!
      <LoginFormWrap>
        <label htmlFor="user-id">아이디</label>
        <input type="text" name="user-id" />
        <label htmlFor="user-password">비밀번호</label>
        <input type="text" name="user-password" />
      </LoginFormWrap>
      <ButtonWrap>
        <button type="submit">로그인</button>
        <button type="submit">회원가입 하기</button>
      </ButtonWrap>
    </>
  );
};

export default LoginForm;
