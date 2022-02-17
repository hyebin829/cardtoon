import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { Menu, MenuItem, Divider, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const CommentList = ({ post }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.user?.id);
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const onRemoveComment = useCallback(()=>{
  //   if(!id){
  //     return alert('로그인이 필요합니다.');
  //   }
  //   return dispatch({
  //     type: REMOVE_COMMENT_REQUEST,
  //     data: post.Comments.id
  //   })
  // },[])

  // const list = post.Comments.map(v => v.id);
  // console.log(list);

  return (
    <List>
      {post.Comments.map(v => (
        <ListItem alignItems="flex-start" key={v.id}>
          <ListItemText primary={v.User.nickname} secondary={v.content} />
          <Box>
            <MoreVertIcon onClick={handleOpenUserMenu} />
            <Menu
              sx={{ mt: '25px' }}
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
                  <Typography textAlign="left">수정</Typography>
                  <Typography textAlign="left">삭제</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        </ListItem>
      ))}
      <Divider variant="middle" component="li" />
    </List>
  );
};
export default CommentList;
