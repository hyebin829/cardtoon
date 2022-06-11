import React from 'react';
import ProfileForm from '../components/ProfileForm';
import MainMenu from '../components/MenuBar';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ProfilePage() {
  return (
    <>
      <Header />
      <ProfileForm />
      <MainMenu />
      <Footer />
    </>
  );
}

export default ProfilePage;
