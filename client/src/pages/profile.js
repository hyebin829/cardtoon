import React from 'react';
import ProfileForm from '../components/ProfileForm';
import MainMenu from '../components/MenuBar';
import CardtoonAppBar from '../components/CardtoonAppBar';
import Footer from '../components/Footer';

function ProfilePage() {
  return (
    <>
      <CardtoonAppBar />
      <ProfileForm />
      <MainMenu />
      <Footer />
    </>
  );
}

export default ProfilePage;
