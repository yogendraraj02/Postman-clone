// src/components/Dashboard.jsx
import React from 'react';
import MainContent from '../components/MainContent';

function Dashboard({ isAuthenticated }) {
  return (
    <MainContent isAuthenticated={isAuthenticated} />
  );
}

export default Dashboard;