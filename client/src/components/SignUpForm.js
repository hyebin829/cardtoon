import React from 'react';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const SignUpFormWrap = styled.div``;
const SignupButtonWrap = styled.div``;

const SignUpForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangeId = useCallback(e => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <SignUpFormWrap>
          <label htmlFor="user-id">아이디</label>
          <input name="user-id" value={id} onChange={onChangeId} />
          <label htmlFor="user-password">비밀번호</label>
          <input
            name="user-password"
            value={password}
            onChange={onChangePassword}
          />
          <label htmlFor="check-user-password">비밀번호 확인</label>
          <input
            name="check-user-password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordError && <div>비밀번호가 일치하지 않습니다</div>}
          <label htmlFor="user-nickname">닉네임</label>
          <input
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
          />
        </SignUpFormWrap>
        <SignupButtonWrap>
          <button type="submit">회원가입 하기</button>
        </SignupButtonWrap>
      </form>
    </>
  );
};

export default SignUpForm;
