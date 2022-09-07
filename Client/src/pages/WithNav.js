import React from 'react';
import Navbar from './Components/navbar';
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
