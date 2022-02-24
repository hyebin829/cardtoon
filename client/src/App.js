import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Home from './pages/home';
import SignUpPage from './pages/signup';
import React from 'react';

import PopularCardtoonPage from './pages/popularcardtoon';
import ProfilePage from './pages/profile';
import UploadPost from './pages/uploadpost';
import EditProfilePage from './pages/editprofile';
import UserprofilePage from './pages/userprofile';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_USER_INFO_REQUEST } from './reducers/user';

const App = () => {
  const { logInDone, user, profileImagePath } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
  }, [profileImagePath]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/popularcardtoon" element={<PopularCardtoonPage />} />
          <Route path="/uploadpost" element={<UploadPost />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
          <Route exact path="/userprofile/:id" element={<UserprofilePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
