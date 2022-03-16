import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import MainMenu from '../components/MenuBar';
import { LOAD_USER_PROFILE_REQUEST } from '../reducers/user';

import styled from 'styled-components';
import { Avatar, Box, Stack, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const List = styled.li`
  list-style: none;
`;

const Nickname = styled.div`
  margin-top: 10px;
  font-size: 25px;
  font-weight: 400;
`;

const UserprofilePage = () => {
  const params = useParams();
  console.log(params);
  const id = params.id;

  const { userProfile } = useSelector(state => state.user);
  const { homePosts } = useSelector(state => state.post);

  const userPosts = homePosts.filter(x => x.UserId === +id);
  console.log(userPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_PROFILE_REQUEST,
      data: params.id,
    });
  }, [id]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      }}
    >
      {userProfile?.profileimagesrc === null ? (
        <AccountCircleIcon sx={{ width: 130, height: 130 }} />
      ) : (
        <Avatar
          src={`http://localhost:3065/${userProfile?.profileimagesrc}`}
          sx={{ width: 130, height: 130 }}
        />
      )}

      <Nickname>
        {userProfile?.nickname === null
          ? '닉네임을 설정해주세요'
          : userProfile?.nickname}
      </Nickname>

      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        marginTop="20px"
      >
        <List>
          <Stack>
            <div>{userProfile?.Posts.length}</div>
            <div>게시글</div>
          </Stack>
        </List>
        <List>
          <Stack>
            <div>{userProfile?.Followers.length} </div>
            <div>나를 즐겨찾는</div>
          </Stack>
        </List>
        <List>
          <Stack>
            <div>{userProfile?.Followings.length} </div>
            <div>즐겨찾기</div>
          </Stack>
        </List>
      </Stack>
      <ImageList cols={3} sx={{ mb: '70px', padding: '10px' }}>
        {userPosts.map(x => (
          <Link to={`/userpost/${x.id}`}>
            <ImageListItem key={x.Images[0].id} sx={{ padding: '2px' }}>
              <img
                src={`http://localhost:3065/${x.Images[0].src}`}
                // srcSet={`${x.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={x.content}
                loading="lazy"
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
      <MainMenu />
    </Box>
  );
};

export default UserprofilePage;
