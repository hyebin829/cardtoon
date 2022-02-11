import React from 'react';
import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';

const ProfileForm = () => {
  return (
    <>
      <Avatar src="/img/1.jpg" sx={{ width: 120, height: 120 }} />
      <ul>
        <li>게시물</li>
        <li>팔로워</li>
        <li>팔로잉</li>
      </ul>
    </>
  );
};

export default ProfileForm;
