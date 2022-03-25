import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { Avatar, Box, Stack, Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { LOAD_MYPOSTS_REQUEST } from '../reducers/post';
import { DELETE_ACCOUNT_REQUEST } from '../reducers/user';

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

const ButtonText = styled('div')({
  color: 'grey',
});

const ProfileForm = () => {
  const { user } = useSelector(state => state.user);
  const { myPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myId = user?.id;

  useEffect(() => {
    if (myId) {
      dispatch({
        type: LOAD_MYPOSTS_REQUEST,
        myId,
      });
    }
  }, [myId]);

  const onDeleteAccount = () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      dispatch({
        type: DELETE_ACCOUNT_REQUEST,
        data: myId,
      });
      alert('탈퇴완료되었습니다.');
      navigate('/');
    }
  };

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
      <Button onClick={onDeleteAccount}>
        <ButtonText>회원탈퇴</ButtonText>
      </Button>
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
      <ProfileImageList cols={3} sx={{ mb: '70px', padding: '10px' }}>
        {myPosts.map(x => (
          <Link to={`/userpost/${x.id}`} key={x.Images[0].id}>
            <ImageListItem key={x.Images[0].id} sx={{ padding: '2px' }}>
              <img
                src={`http://localhost:3065/${
                  x.Images[x.Images.length - 1].src
                }`}
                alt={x.content}
                loading="lazy"
                draggable={false}
              />
            </ImageListItem>
          </Link>
        ))}
      </ProfileImageList>
    </Box>
  );
};

export default ProfileForm;
