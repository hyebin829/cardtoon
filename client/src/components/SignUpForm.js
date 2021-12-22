import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SIGN_UP_REQUEST } from '../reducers/user';

const SignUpFormWrap = styled.div``;
const SignupButtonWrap = styled.div``;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, user } = useSelector(
    state => state.user
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (signUpDone) {
      navigate('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
    }
  }, [signUpError]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        setPasswordError(true);
      } else if (password === passwordCheck) {
        setPasswordError(false);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password },
      });
    },
    [email, password, passwordCheck]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <SignUpFormWrap>
          <label htmlFor="user-email">이메일</label>
          <input name="user-email" value={email} onChange={onChangeEmail} />
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
        </SignUpFormWrap>
        <SignupButtonWrap>
          <button type="submit">회원가입</button>
        </SignupButtonWrap>
      </form>
    </>
  );
};

export default SignUpForm;
