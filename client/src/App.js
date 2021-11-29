import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Home from './pages/home';
import SignUpPage from './pages/signup';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/signup" element={<SignUpPage />} exact />
        </Routes>
      </Router>
    </>
  );
};

export default App;
