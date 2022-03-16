import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import HomePostContent from '../components/HomePostContent';
import CommentList from '../components/CommentList';
import FollowButton from '../components/FollowButton';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import { Box } from '@mui/system';
import { Card, CardHeader, CardContent, Button, Divider } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { red } from '@mui/material/colors';

import {
  Toolbar,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from '@mui/material';
import LikeButton from '../components/LikeButton';

const LogoutButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-size: 15px;
`;

const EmptyPost = styled.div`
  font-size: 25px;
  margin: 80% 0;
  text-align: center;
  color: #40101d;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone } = useSelector(state => state.user);
  const { homePosts, loadHomePostsLoading, hasMorePost, removeCommentLoading } =
    useSelector(state => state.post);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const id = useSelector(state => state.user.user?.id);

  console.log(homePosts);
  console.log(id);
  useEffect(() => {
    if (logOutDone) {
      Navigate('/');
    }
  }, [logOutDone]);

  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };
    const intersectHandler = entries =>
      entries.forEach(entry => {
        const lastId = homePosts[homePosts.length - 1]?.id;
        if (!entry.isIntersecting) return;
        if (entry.isIntersecting && hasMorePost && !loadHomePostsLoading) {
          dispatch({
            type: LOAD_HOMEPOSTS_REQUEST,
            lastId,
          });
        }
      });

    const observer = new IntersectionObserver(intersectHandler, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, [
    hasMorePost,
    loadHomePostsLoading,
    homePosts,
    loader,
    removeCommentLoading,
  ]);

  const onLogout = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" elevation="0">
        <Toolbar>
          <Typography variant="h6">CARDTOON</Typography>
          <Box sx={{ position: 'absolute', right: 15 }}>
            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
              {user?.profileimagesrc === null ? (
                <AccountCircleIcon sx={{ width: 40, height: 40 }} />
              ) : (
                <Avatar
                  src={`http://localhost:3065/${user?.profileimagesrc}`}
                  sx={{ width: 40, height: 40 }}
                />
              )}
            </IconButton>
            <Menu
              sx={{ mt: '40px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Stack>
                  <Typography textAlign="left">
                    <Link
                      to="/profile"
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontSize: 15,
                      }}
                    >
                      프로필
                    </Link>
                  </Typography>
                  <Typography textAlign="left">
                    <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
                  </Typography>
                </Stack>{' '}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ mb: '65px' }}>
        <MenuBar />
        {/* 포스트 */}
        {homePosts.length !== 0 ? (
          homePosts.map((post, i) => (
            <>
              <Card
                sx={{ height: '100%', margin: '20px 5px' }}
                variant="outlined"
              >
                <CardHeader
                  title={
                    <Link
                      to={`/userprofile/${post.User.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {post.User.nickname}
                    </Link>
                  }
                  avatar={
                    <Link to={`/userprofile/${post.User.id}`}>
                      {' '}
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="profilepic"
                        src={`http://localhost:3065/${post.User.profileimagesrc}`}
                      />
                    </Link>
                  }
                  action={<FollowButton post={post} />}
                />
                <CardContent>
                  <HomePostContent
                    sx={{ whiteSpace: 'normal' }}
                    post={post}
                    key={post.id}
                  />
                </CardContent>
                <Divider variant="middle" />
                <LikeButton post={post} />
                <CommentList post={post} />
              </Card>
            </>
          ))
        ) : (
          <EmptyPost>작성된 게시글이 없습니다.</EmptyPost>
        )}
        <div ref={hasMorePost && !loadHomePostsLoading ? loader : undefined} />
      </Box>
    </>
  );
};

export default Home;
