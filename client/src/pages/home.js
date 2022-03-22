import React, { useEffect, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CircularProgress from '@mui/material/CircularProgress';

import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Fab from '@mui/material/Fab';

import HomePostContent from '../components/HomePostContent';
import CommentList from '../components/CommentList';
import FollowButton from '../components/FollowButton';

import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import { Box } from '@mui/system';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  IconButton,
} from '@mui/material';

import { red } from '@mui/material/colors';

import { Avatar } from '@mui/material';
import LikeButton from '../components/LikeButton';
import CardtoonAppBar from '../components/CardtoonAppBar';
import Footer from '../components/Footer';

const EmptyPost = styled('div')({
  fontSize: '25px',
  margin: '80% 0',
  textAlign: 'center',
  color: '#40101d',
});

const CardBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tabletM')]: {
    padding: '10px 70px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '20px 120px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '30px 400px',
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const { logOutDone, logInDone } = useSelector(state => state.user);
  const {
    homePosts,
    loadHomePostsLoading,
    hasMorePost,
    removeCommentLoading,
    nickname,
  } = useSelector(state => state.post);
  const theme = useTheme();
  const tabletLUp = useMediaQuery(theme.breakpoints.up('tabletL'));

  useEffect(() => {
    if (logOutDone) {
      Navigate('/');
    }
  }, [logOutDone]);

  const loader = useRef(null);

  console.log(homePosts);

  useEffect(() => {
    dispatch({
      type: LOAD_HOMEPOSTS_REQUEST,
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
    nickname,
    logInDone,
  ]);

  return (
    <>
      <CardtoonAppBar />
      <CardBox sx={{ mb: '65px' }}>
        {/* 포스트 */}
        {homePosts
          ? homePosts.map((post, i) => (
              <Card
                sx={{ height: '100%', margin: '20px 5px', padding: '10px' }}
                variant="outlined"
                key={i}
              >
                <CardHeader
                  key={post.User.id}
                  title={
                    <Link
                      to={`/userprofile/${post.User.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {post.User.nickname}
                    </Link>
                  }
                  avatar={
                    <Link
                      to={`/userprofile/${post.User.id}`}
                      key={post.User.id}
                    >
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="profilepic"
                        src={`http://localhost:3065/${post.User.profileimagesrc}`}
                      />
                    </Link>
                  }
                  action={
                    <FollowButton post={post} key={`FollowButton${post.id}`} />
                  }
                />
                <Divider variant="middle" />
                <CardContent key={post.id}>
                  <HomePostContent
                    sx={{ whiteSpace: 'normal' }}
                    post={post}
                    key={post.id}
                  />
                </CardContent>
                <Divider variant="middle" />
                <LikeButton post={post} key={`LikeButton${post.id}`} />
                <CommentList post={post} key={`CommentList${post.id}`} />
              </Card>
            ))
          : ''}
        {homePosts && homePosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', margin: '50%' }}>
            <CircularProgress />
          </Box>
        ) : (
          ''
        )}

        <div ref={hasMorePost && !loadHomePostsLoading ? loader : undefined} />
      </CardBox>
      {tabletLUp ? (
        <Fab
          color="secondary"
          sx={{ position: 'fixed', zIndex: '100', bottom: 20, right: 20 }}
          onClick={scrollToTop}
          size="medium"
        >
          <KeyboardArrowUpRoundedIcon
            fontSize="large"
            sx={{ color: 'white' }}
          />
        </Fab>
      ) : (
        ''
      )}
      <MenuBar />
      <Footer />
    </>
  );
};

export default Home;
