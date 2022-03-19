import React from 'react';
import styled from 'styled-components';
import { Router, Route, Routes, Link } from 'react-router-dom';

import { AppBar, BottomNavigationAction, Paper } from '@mui/material';
import { MenuItem } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import BottomNavigation from '@mui/material/BottomNavigation';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonIcon from '@mui/icons-material/Person';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const MainMenu = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        marginTop: '10px',
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="홈"
          icon={<HomeRoundedIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="인기툰"
          icon={<LocalFireDepartmentIcon />}
          component={Link}
          to="/popularcardtoon"
        />
        <BottomNavigationAction
          label="글쓰기"
          icon={<CreateIcon />}
          component={Link}
          to="/uploadpost"
        />
        <BottomNavigationAction
          label="프로필"
          icon={<PersonIcon />}
          component={Link}
          to="/profile"
        />
        <BottomNavigationAction
          label="즐겨찾기"
          icon={<StarRoundedIcon />}
          component={Link}
          to="/favorites"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MainMenu;
