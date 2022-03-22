import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';

import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonIcon from '@mui/icons-material/Person';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CreateIcon from '@mui/icons-material/Create';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const LogoutButton = styled('button')({
  border: 'none',
  background: 'none',
  padding: 0,
  fontSize: '15px',
});

const CardtoonAppBar = () => {
  const theme = useTheme();
  const tabletLUp = useMediaQuery(theme.breakpoints.up('tabletL'));

  const [anchorElUser, setAnchorElUser] = useState(null);
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
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'white',
              marginRight: '10px',
            }}
          >
            <Typography variant="h6">CARDTOON</Typography>
          </Link>
          {tabletLUp ? (
            <Box>
              <Stack direction="row" spacing={2}>
                <Link
                  to="/popularcardtoon"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  인기툰
                </Link>
                <Link
                  to="/uploadpost"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  글쓰기
                </Link>
                <Link
                  to="/profile"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  프로필
                </Link>
                <Link
                  to="/favorites"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  즐겨찾기
                </Link>
              </Stack>
            </Box>
          ) : (
            ''
          )}
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
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CardtoonAppBar;
