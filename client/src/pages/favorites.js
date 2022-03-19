import React from 'react';
import CardtoonAppBar from '../components/CardtoonAppBar';
import FollowList from '../components/FollowList';
import MainMenu from '../components/MenuBar';

const FavoritesPage = () => {
  return (
    <>
      <CardtoonAppBar />
      <FollowList />
      <MainMenu />
    </>
  );
};

export default FavoritesPage;
