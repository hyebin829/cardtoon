import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EditProfilePage from '../pages/editprofile';

import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const ProfileForm = () => {
  const { user } = useSelector(state => state.user);

  return (
    <>
      <Avatar src="/img/1.jpg" sx={{ width: 120, height: 120 }} />
      <Button>
        <Link to="/editprofile">수정</Link>
      </Button>
      <ul>
        <div>
          {user?.nickname === null ? '닉네임을 설정해주세요' : user?.nickname}
        </div>
        <li>게시글 {user?.Posts.length}개</li>
        <li>팔로워 {user?.Followers.length} 명</li>
        <li>팔로잉 {user?.Followings.length} 명</li>
      </ul>
    </>
  );
};

export default ProfileForm;
