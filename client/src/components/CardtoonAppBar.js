import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Toolbar,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Box,
  Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LOG_OUT_REQUEST } from '../reducers/user';

const IconMenuButton = styled(Button)({
  border: 'none',
  background: 'none',
  padding: 0,
  fontSize: '15px',
  justifyContent: 'flex-start',
});

const TitleImage = styled('img')({
  width: '180px',
  height: '100%',
  marginTop: '10px',
});

function CardtoonAppBar() {
  const theme = useTheme();

  const tabletLUp = useMediaQuery(theme.breakpoints.up('tabletL'));
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logOutDone } = useSelector(state => state.user);

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
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, navigate]);

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
            <TitleImage
              src={require('../Assets/Images/cardtoontitle.png')}
              alt="cardtoon title"
            />
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
              sx={{ mt: '38px', zIndex: '10' }}
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
              <Stack>
                <MenuItem>
                  <Link
                    to="/profile"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <IconMenuButton>프로필</IconMenuButton>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <IconMenuButton onClick={onLogout}>로그아웃</IconMenuButton>
                </MenuItem>
              </Stack>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CardtoonAppBar;
