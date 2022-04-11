import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Avatar, Box, Stack, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { LOAD_USER_PROFILE_REQUEST } from '../reducers/user';
import { LOAD_MYPOSTS_REQUEST } from '../reducers/post';
import CardtoonAppBar from '../components/CardtoonAppBar';
import MainMenu from '../components/MenuBar';
import Footer from '../components/Footer';

const List = styled('li')({
  listStyle: 'none',
});

const Nickname = styled('div')({
  marginTop: '10px',
  fontSize: '25px',
  fontWeight: '400',
});

const ProfileImageList = styled(ImageList)(({ theme }) => ({
  [theme.breakpoints.up('tabletL')]: {
    width: '80%',
  },
  [theme.breakpoints.up('desktop')]: {
    width: '60%',
  },
}));

function UserprofilePage() {
  const params = useParams();
  const myId = params.id;

  const { userProfile } = useSelector(state => state.user);
  const { myPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myId) {
      dispatch({
        type: LOAD_MYPOSTS_REQUEST,
        myId,
      });
    }
  }, [myId]);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_PROFILE_REQUEST,
      data: params.id,
    });
  }, [myId]);

  return (
    <>
      <CardtoonAppBar />
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
            src={`/api/${userProfile?.profileimagesrc}`}
            sx={{ width: 130, height: 130 }}
            alt="profile image"
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
        <ProfileImageList cols={3} sx={{ mb: '70px', padding: '10px' }}>
          {myPosts.map(x => (
            <Link to={`/userpost/${x.id}`} key={`post${x.id}`}>
              <ImageListItem key={x.Images[0].id} sx={{ padding: '2px' }}>
                <img
                  src={`/api/${x.Images[0].src}`}
                  alt={x.content}
                  loading="lazy"
                  draggable={false}
                />
              </ImageListItem>
            </Link>
          ))}
        </ProfileImageList>
        <MainMenu />
        <Footer />
      </Box>
    </>
  );
}

export default UserprofilePage;
