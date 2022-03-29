import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingPage from './components/LoadingPage.js';
const Home = lazy(() => import('./pages/home'));
const LoginPage = lazy(() => import('./pages/login'));
const SignUpPage = lazy(() => import('./pages/signup'));
const PopularCardtoonPage = lazy(() => import('./pages/popularcardtoon'));
const ProfilePage = lazy(() => import('./pages/profile'));
const EditProfilePage = lazy(() => import('./pages/editprofile'));
const UserprofilePage = lazy(() => import('./pages/userprofile'));
const UserpostPage = lazy(() => import('./pages/userpost'));
const FavoritesPage = lazy(() => import('./pages/favorites'));
const UploadPost = lazy(() => import('./pages/uploadpost'));

// import LoginPage from './pages/login';
// import Home from './pages/home';
// import SignUpPage from './pages/signup';

// import PopularCardtoonPage from './pages/popularcardtoon';
// import ProfilePage from './pages/profile';
// import UploadPost from './pages/uploadpost';
// import EditProfilePage from './pages/editprofile';
// import UserprofilePage from './pages/userprofile';
// import UserpostPage from './pages/userpost';
// import FavoritesPage from './pages/favorites';

import { LOAD_USER_INFO_REQUEST } from './reducers/user';

const App = () => {
  const { user, profileImagePath, signUpDone, nickname, deleteAccountDone } =
    useSelector(state => state.user);
  const { addHomePostDone, removePostDone } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
  }, [
    profileImagePath,
    signUpDone,
    addHomePostDone,
    removePostDone,
    nickname,
    deleteAccountDone,
  ]);

  return (
    <>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={user ? <Home /> : <LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/popularcardtoon"
              element={user ? <PopularCardtoonPage /> : <LoginPage />}
            />
            <Route
              path="/uploadpost"
              element={user ? <UploadPost /> : <LoginPage />}
            />
            <Route
              path="/profile"
              element={user ? <ProfilePage /> : <LoginPage />}
            />
            <Route
              path="/editprofile"
              element={user ? <EditProfilePage /> : <LoginPage />}
            />
            <Route
              path="/userprofile/:id"
              element={user ? <UserprofilePage /> : <LoginPage />}
            />
            <Route
              path="/userpost/:id"
              element={user ? <UserpostPage /> : <LoginPage />}
            />
            <Route
              path="/favorites"
              element={user ? <FavoritesPage /> : <LoginPage />}
            />
          </Routes>{' '}
        </Suspense>
      </Router>
    </>
  );
};

export default App;
