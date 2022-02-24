import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MainMenu from '../components/MenuBar';
import { LOAD_USER_PROFILE_REQUEST } from '../reducers/user';

import { Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserprofilePage = () => {
  const params = useParams();
  console.log(params);
  const id = params.id;
  const { userProfile } = useSelector(state => state.user);

  const dispatch = useDispatch();
  console.log(userProfile);
  useEffect(() => {
    dispatch({
      type: LOAD_USER_PROFILE_REQUEST,
      data: params.id,
    });
    console.log('useeffect실행');
  }, [id]);

  return (
    <>
      {userProfile?.profileimagesrc === null ? (
        <AccountCircleIcon sx={{ width: 120, height: 120 }} />
      ) : (
        <Avatar
          src={`http://localhost:3065/${userProfile?.profileimagesrc}`}
          sx={{ width: 120, height: 120 }}
        />
      )}

      <ul>
        <div>
          닉네임 :{' '}
          {userProfile?.nickname === null
            ? '닉네임을 설정해주세요'
            : userProfile?.nickname}
        </div>
        <li>게시글 {userProfile?.Posts.length}개</li>
        <li>팔로워 {userProfile?.Followers.length} 명</li>
        <li>팔로잉 {userProfile?.Followings.length} 명</li>
      </ul>
      <MainMenu />
    </>
  );
};

export default UserprofilePage;
