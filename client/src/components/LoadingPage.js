import React from 'react';
import Footer from '../components/Footer';
import { CircularProgress, Box } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box sx={{ textAlign: 'center', margin: '50%' }}>
      <CircularProgress />
    </Box>
  );
};
export default LoadingPage;
