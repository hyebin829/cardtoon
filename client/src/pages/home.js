import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Route, Link, Navigate, useParams } from 'react-router-dom';
import LoginPage from './login';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';

import HomePostForm from '../components/HomePostForm';
import HomePostContent from '../components/HomePostContent';
import PostImage from '../components/HomePostImage';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FollowButton from '../components/FollowButton';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import { Box } from '@mui/system';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  List,
  ListItem,
  Divider,
  ListItemText,
} from '@mui/material';
import LikeButton from '../components/LikeButton';

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone } = useSelector(state => state.user);
  const { homePosts, loadHomePostsLoading, hasMorePost, removeCommentLoading } =
    useSelector(state => state.post);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const id = useSelector(state => state.user.user?.id);

  const params = useParams();
  console.log(params);

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

  console.log(homePosts.id);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ position: 'absolute', right: 10 }}>
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
        {/* 포스트 */}
        {homePosts.map((post, i) => (
          <>
            <Card sx={{ height: '100%', margin: '40px 5px' }}>
              <CardHeader
                title={post.User.nickname}
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="profilepic"
                    src={`http://localhost:3065/${post.User.profileimagesrc}`}
                  />
                }
                action={<FollowButton post={post} />}
              />
              <CardContent>
                <HomePostContent post={post} key={post.id} />
              </CardContent>
              <LikeButton post={post} />
            </Card>
            <CommentForm post={post} />
            <CommentList post={post} />
          </>
        ))}
        <div ref={hasMorePost && !loadHomePostsLoading ? loader : undefined} />
      </Box>
    </>
  );
};

export default Home;
