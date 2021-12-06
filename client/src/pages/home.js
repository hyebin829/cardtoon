import React, { useCallback, useState } from 'react';
import { Route } from 'react-router';
import LoginPage from './login';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';

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
      <button onClick={onLogout}>로그아웃</button>
      <Menu />
    </>
  );
};

export default Home;
