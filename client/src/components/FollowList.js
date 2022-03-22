import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import CircularProgress from '@mui/material/CircularProgress';

import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { LOAD_FAVORITES_REQUEST } from '../reducers/user';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import FollowDeleteButton from './FollowDeleteButton';

const CardBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tabletM')]: {
    padding: '10px 70px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '20px 300px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '30px 500px',
  },
}));

const EmptyUser = styled('div')({
  fontSize: '20px',
  textAlign: 'center',
  margin: '20px 0',
});

const FollowList = () => {
  const { user, userFavorites } = useSelector(state => state.user);

  const userId = user?.id;
  const dispatch = useDispatch();
  console.log(userFavorites);

  useEffect(() => {
    if (userId) {
      dispatch({
        type: LOAD_FAVORITES_REQUEST,
        userId,
      });
    }
  }, [userId, user]);

  return (
    <CardBox>
      {userFavorites ? (
        userFavorites.map(x => (
          <Box key={x.id}>
            <List sx={{ width: '100%' }}>
              <ListItem secondaryAction={<FollowDeleteButton userid={x.id} />}>
                {x.profileimagesrc ? (
                  <Link
                    to={`/userprofile/${x.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Avatar
                      src={`http://localhost:3065/${x.profileimagesrc}`}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/userprofile/${x.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <AccountCircleIcon sx={{ width: 50, height: 50 }} />
                  </Link>
                )}
                <Link
                  to={`/userprofile/${x.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItemText
                    primary={`${x.nickname}`}
                    sx={{ paddingLeft: '15px' }}
                  />
                </Link>
              </ListItem>
            </List>
          </Box>
        ))
      ) : (
        <Box sx={{ textAlign: 'center', margin: '50%' }}>
          <CircularProgress />
        </Box>
      )}
      {userFavorites && userFavorites.length === 0 ? (
        <EmptyUser>즐겨찾는 유저가 없습니다.</EmptyUser>
      ) : (
        ''
      )}
    </CardBox>
  );
};

export default FollowList;
