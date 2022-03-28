import React from 'react';
import MenuBar from '../components/MenuBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_HOTPOSTS_REQUEST } from '../reducers/post';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Box,
} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Fab from '@mui/material/Fab';
import { red } from '@mui/material/colors';

import HomePostContent from '../components/HomePostContent';
import CommentList from '../components/CommentList';
import FollowButton from '../components/FollowButton';
import LikeButton from '../components/LikeButton';
import CardtoonAppBar from '../components/CardtoonAppBar';
import Footer from '../components/Footer';

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

const PopularCardtoonPage = () => {
  const { hotPosts } = useSelector(state => state.post);

  const theme = useTheme();
  const tabletLUp = useMediaQuery(theme.breakpoints.up('tabletL'));

  const hasLikers = hotPosts.filter(x => x.Likers.length > 0);
  const {
    removeCommentLoading,
    addCommentLoading,
    likePostLoading,
    unLikePostLoading,
    removePostLoading,
  } = useSelector(state => state.post);

  const descLikers = hasLikers?.sort(
    (a, b) => b.Likers.length - a.Likers.length
  );

  const rank = [...new Set(hasLikers.map(x => x.Likers.length))];
  const fifthPlace = rank[4] ? rank[4] : rank[rank.length - 1];
  const hotPostsArr = descLikers.filter(x => x.Likers.length >= fifthPlace);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_HOTPOSTS_REQUEST,
    });
  }, [
    removeCommentLoading,
    addCommentLoading,
    likePostLoading,
    unLikePostLoading,
    removePostLoading,
  ]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <CardtoonAppBar />
      <CardBox sx={{ mb: '65px' }}>
        {hotPosts.length !== 0 ? (
          hotPostsArr?.map((post, i) => (
            <Card
              sx={{ height: '100%', margin: '20px 5px', padding: '10px' }}
              variant="outlined"
              key={i}
            >
              <CardHeader
                title={
                  <Link
                    to={`/userprofile/${post.User.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                    key={`user${i}`}
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
              <Divider variant="middle" />
              <CardContent>
                <HomePostContent
                  sx={{ whiteSpace: 'normal' }}
                  post={post}
                  key={`post${post.id}`}
                />
              </CardContent>
              <Divider variant="middle" />
              <LikeButton post={post} />
              <CommentList post={post} />
            </Card>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', margin: '50%' }}>
            <CircularProgress />
          </Box>
        )}
        <MenuBar />
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
      <Footer />
    </>
  );
};

export default PopularCardtoonPage;
