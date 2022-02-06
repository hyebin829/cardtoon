import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Home from './pages/home';
import SignUpPage from './pages/signup';
import React from 'react';
import LatestWebtoonPage from './pages/latestwebtoon';
import PopularWebtoonPage from './pages/popularwebtoon';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_USER_INFO_REQUEST } from './reducers/user';

import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  const { logInDone, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/latestwebtoon" element={<LatestWebtoonPage />} />
          <Route path="/popularwebtoon" element={<PopularWebtoonPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
