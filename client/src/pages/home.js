import React, { useCallback, useState } from 'react';
import { Route } from 'react-router';
import LoginPage from './login';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';

import { logoutAction } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  });

  return (
    <>
      <div>Home입니다</div>
      <button onClick={onLogout}>로그아웃</button>
      <Menu />
    </>
  );
};

export default Home;
