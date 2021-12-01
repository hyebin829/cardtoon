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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <LoginPage />}
            exact
          />
          <Route path="/signup" element={<SignUpPage />} exact />
          <Route path="/sharelist" element={<ShareListPage />} />
          <Route path="/beautylist" element={<BeautyListPage />} />
          <Route path="/hospitallist" element={<HospitalListPage />} />
          <Route path="/foodlist" element={<FoodListPage />} />
          <Route path="/meetlist" element={<MeetListPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
