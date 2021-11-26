import React from 'react';
import styled from 'styled-components';

const SignUpFormWrap = styled.div``;
const SignupButtonWrap = styled.div``;

const SignUpForm = () => {
  return (
    <>
      <SignUpFormWrap>
        <label htmlFor="user-id">아이디</label>
        <input name="user-id"></input>
        <label htmlFor="user-password">비밀번호</label>
        <input name="user-password"></input>
        <label htmlFor="check-user-password">비밀번호 확인</label>
        <input name="check-user-password"></input>
        <label htmlFor="user-nickname">닉네임</label>
        <input name="user-nickname"></input>
      </SignUpFormWrap>
      <SignupButtonWrap>
        <button type="submit">회원가입 하기</button>
      </SignupButtonWrap>
    </>
  );
};
