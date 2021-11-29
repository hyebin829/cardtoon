import React, { useState } from 'react';
import { Route } from 'react-router';
import LoginPage from './login';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <div>{isLoggedIn ? ' home입니다!' : <LoginPage />}</div>;
};

export default Home;
