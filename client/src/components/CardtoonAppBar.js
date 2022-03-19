import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Toolbar,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { LOG_OUT_REQUEST } from '../reducers/user';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LogoutButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-size: 15px;
`;

const CardtoonAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logOutDone } = useSelector(state => state.user);
  const id = useSelector(state => state.user.user?.id);

  useEffect(() => {
    if (logOutDone) {
      Navigate('/');
    }
  }, [logOutDone]);

  const dispatch = useDispatch();
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <AppBar position="static" elevation={0}>
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
  );
};

export default CardtoonAppBar;
