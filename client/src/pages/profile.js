import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../components/ProfileForm';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import MainMenu from '../components/MenuBar';

const ProfilePage = () => {
  return (
    <>
      <ProfileForm />
      <MainMenu />
    </>
  );
};

export default ProfilePage;
