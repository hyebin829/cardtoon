import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostImage from './HomePostImage';
import { useState, useCallback } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Menu, MenuItem, Stack } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentForm from './CommentForm';

import { REMOVE_POST_REQUEST } from '../reducers/post';

const HomePostContent = ({ post }) => {
  const dispatch = useDispatch();
  const [anchorElMyPost, setAnchorElMyPost] = useState(null);
  const [anchorElPost, setAnchorElPost] = useState(null);

  const id = useSelector(state => state.user.user?.id);

  const handleOpenPost = event => {
    setAnchorElPost(event.currentTarget);
  };

  const handleClosePost = () => {
    setAnchorElPost(null);
  };

  const handleOpenMyPost = event => {
    setAnchorElMyPost(event.currentTarget);
  };

  const handleCloseMyPost = () => {
    setAnchorElMyPost(null);
  };

  const onRemovePost = useCallback(() => {
    if (!id) {
      return '로그인이 필요합니다.';
    }
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: post.id,
      });
      alert('삭제되었습니다.');
      window.location.replace('/');
    } else {
      return;
    }
  }, []);

  return (
    <div>
      <PostImage images={post.Images} />
      {post.User.id === id ? (
        <Box>
          <MoreVertIcon onClick={handleOpenMyPost} />
          <Menu
            sx={{ mt: '25px' }}
            id="menu-appbar"
            anchorEl={anchorElMyPost}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElMyPost)}
            onClose={handleCloseMyPost}
          >
            <MenuItem onClick={handleCloseMyPost}>
              <Stack>
                <Typography textAlign="left">수정</Typography>
                <Typography textAlign="left" onClick={onRemovePost}>
                  삭제
                </Typography>
              </Stack>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box>
          <MoreVertIcon onClick={handleOpenPost} />
          <Menu
            sx={{ mt: '25px' }}
            id="menu-appbar"
            anchorEl={anchorElPost}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElPost)}
            onClose={handleClosePost}
          >
            <MenuItem onClick={handleClosePost}>
              <Typography>신고</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      {post.content}
    </div>
  );
};

export default HomePostContent;
