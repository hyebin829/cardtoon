import React from 'react';
import styled from 'styled-components';
import { Router, Route, Routes, Link } from 'react-router-dom';

import { AppBar, BottomNavigationAction, Paper } from '@mui/material';
import { MenuItem } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import BottomNavigation from '@mui/material/BottomNavigation';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import UpdateIcon from '@mui/icons-material/Update';
import PersonIcon from '@mui/icons-material/Person';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

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
          label="인기카드툰"
          icon={<LocalFireDepartmentIcon />}
          component={Link}
          to="/popularcardtoon"
        />
        <BottomNavigationAction
          label="게시글작성"
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
      </BottomNavigation>
    </Paper>
  );
};

export default MainMenu;
