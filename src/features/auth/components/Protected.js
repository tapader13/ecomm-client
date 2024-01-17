import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedinUser } from '../authSlice';

function Protected({ children }) {
  const user = useSelector(selectLoggedinUser);
  if (!user) {
    return <Navigate to={'/login'}></Navigate>;
  } else {
    return children;
  }
}

export default Protected;
