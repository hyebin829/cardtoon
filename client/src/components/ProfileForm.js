import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EditProfilePage from '../pages/editprofile';

import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileForm = () => {
  const { user } = useSelector(state => state.user);

  return (
    <>
      {user?.profileimagesrc === null ? (
        <AccountCircleIcon sx={{ width: 120, height: 120 }} />
      ) : (
        <Avatar
          src={`http://localhost:3065/${user?.profileimagesrc}`}
          sx={{ width: 120, height: 120 }}
        />
      )}
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
