import React, { useCallback, useEffect, useState } from 'react';
import { Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './login';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';

import HomePostForm from '../components/HomePostForm';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone } = useSelector(state => state.user);

  useEffect(() => {
    if (logOutDone) {
      Navigate('/');
    }
  }, [logOutDone]);

  const onLogout = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div>Home입니다</div>
      <Link to="/profile">프로필</Link>

      <button onClick={onLogout}>로그아웃</button>
      <HomePostForm></HomePostForm>
      <Menu />
    </>
  );
};

export default Home;
