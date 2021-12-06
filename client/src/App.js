import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Home from './pages/home';
import SignUpPage from './pages/signup';
import React from 'react';
import FoodListPage from './pages/foodlist';
import BeautyListPage from './pages/beautylist';
import HospitalListPage from './pages/hospitallist';
import MeetListPage from './pages/meetlist';
import ShareListPage from './pages/sharelist';

import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const { logInDone, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <LoginPage />} exact />
          <Route path="/signup" element={<SignUpPage />} exact />
          <Route path="/sharelist" element={<ShareListPage />} exact />
          <Route path="/beautylist" element={<BeautyListPage />} exact />
          <Route path="/hospitallist" element={<HospitalListPage />} exact />
          <Route path="/foodlist" element={<FoodListPage />} exact />
          <Route path="/meetlist" element={<MeetListPage />} exact />
        </Routes>
      </Router>
    </>
  );
};

export default App;
