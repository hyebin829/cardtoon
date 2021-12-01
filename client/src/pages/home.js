import React, { useState } from 'react';
import { Route } from 'react-router';
import LoginPage from './login';
import Menu from '../components/Menu';

const Home = () => {
  return (
    <>
      <div>Home입니다</div>
      <Menu />
    </>
  );
};

export default Home;
