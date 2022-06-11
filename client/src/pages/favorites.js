import React from 'react';

import FollowList from '../components/FollowList';
import MainMenu from '../components/MenuBar';
import Footer from '../components/Footer';
import Header from '../components/Header';

const FavoritesPage = () => {
  return (
    <>
      <Header />
      <FollowList />
      <MainMenu />
      <Footer />
    </>
  );
};

export default FavoritesPage;
