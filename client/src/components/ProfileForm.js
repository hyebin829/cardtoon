import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Avatar, Box, Stack, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const List = styled.li`
  list-style: none;
`;

const Nickname = styled.div`
  margin-top: 10px;
  font-size: 25px;
  font-weight: 400;
`;

const ProfileForm = () => {
  const { user } = useSelector(state => state.user);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      }}
    >
      {user?.profileimagesrc === null ? (
        <AccountCircleIcon sx={{ width: 130, height: 130 }} />
      ) : (
        <Avatar
          src={`http://localhost:3065/${user?.profileimagesrc}`}
          sx={{ width: 130, height: 130 }}
        />
      )}
      <Nickname>
        {user?.nickname === null ? '닉네임을 설정해주세요' : user?.nickname}
      </Nickname>
      <Link to="/editprofile" style={{ textDecoration: 'none' }}>
        수정
      </Link>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        marginTop="20px"
      >
        <List>
          <Stack>
            <div>{user?.Posts.length}</div>
            <div>게시글</div>
          </Stack>
        </List>
        <List>
          <Stack>
            <div>{user?.Followers.length} </div>
            <div>나를 즐겨찾는</div>
          </Stack>
        </List>
        <List>
          <Stack>
            <div>{user?.Followings.length} </div>
            <div>즐겨찾기</div>
          </Stack>
        </List>
      </Stack>

      
    </Box>
  );
};

export default ProfileForm;
