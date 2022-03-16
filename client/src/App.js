import { useCallback } from 'react';
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
import UserpostPage from './pages/userpost';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_USER_INFO_REQUEST } from './reducers/user';

const App = () => {
  const {
    user,
    profileImagePath,
    signUpDone,
    nickname,
    changeNicknameError,
    changeNicknameDone,
  } = useSelector(state => state.user);
  const { addHomePostDone, removePostDone } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
  }, [profileImagePath, signUpDone, addHomePostDone, removePostDone, nickname]);

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
          <Route path="/userprofile/:id" element={<UserprofilePage />} />
          <Route path="/userpost/:id" element={<UserpostPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
