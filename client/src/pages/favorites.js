import React from 'react';
import CardtoonAppBar from '../components/CardtoonAppBar';
import FollowList from '../components/FollowList';
import MainMenu from '../components/MenuBar';
import Footer from '../components/Footer';

const FavoritesPage = () => {
  return (
    <>
      <CardtoonAppBar />
      <FollowList />
      <MainMenu />
      <Footer />
    </>
  );
};

export default FavoritesPage;
