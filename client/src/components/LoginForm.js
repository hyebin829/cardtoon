import React, { useCallback, useEffect, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

import styles from './login.module.scss';

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

  useEffect(() => {}, [logInError]);

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
    <div className={styles.loginFormWrap}>
      <img src={require('../Assets/Images/cardtoon.png')} alt="cardtoon logo" />
      <form onSubmit={onSubmitForm}>
        <input
          label="id"
          type="text"
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <input
          label="password"
          type="password"
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
        {logInError && <div className={styles.errorMessage}>{logInError}</div>}
        <div className={styles.buttonWrapper}>
          <button className={styles.loginButton} type="submit">
            로그인
          </button>
          <Link to="/signup">
            <button className={styles.signUpButton} type="button">
              회원가입하기
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
