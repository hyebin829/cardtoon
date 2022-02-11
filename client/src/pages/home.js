import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './login';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import HomePostForm from '../components/HomePostForm';
import HomePostContent from '../components/HomePostContent';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import PostImage from '../components/HomePostImage';

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

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone } = useSelector(state => state.user);
  const { homePosts, loadHomePostsLoading, hasMorePost } = useSelector(
    state => state.post
  );
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const profileMenu = ['프로필', '로그아웃'];

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
  }, [hasMorePost, loadHomePostsLoading, homePosts, loader]);

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
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ position: 'absolute', right: 10 }}>
            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
              <Avatar alt="my profile image" src="/img/1.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
                    <Link to="/profile">프로필</Link>
                  </Typography>
                  <Typography textAlign="left">
                    <button onClick={onLogout}>로그아웃</button>
                  </Typography>
                </Stack>{' '}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: '65px' }}>
        <MenuBar />
        {homePosts.map(post => (
          <Card sx={{ height: '100%', margin: '40px 5px' }}>
            <CardHeader
              title="아이디"
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="profilepic">
                  R
                </Avatar>
              }
            />
            <CardContent>
              <HomePostContent post={post} key={post.id} />
            </CardContent>
          </Card>
        ))}
        <div ref={hasMorePost && !loadHomePostsLoading ? loader : undefined} />
      </Box>
    </>
  );
};

export default Home;
