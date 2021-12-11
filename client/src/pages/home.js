import React, { useCallback, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import LoginPage from './login';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';

import HomePostForm from '../components/HomePostForm';

import { LOG_OUT_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
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
