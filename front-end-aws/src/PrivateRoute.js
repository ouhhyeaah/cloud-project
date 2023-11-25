import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element, isAuth }) => {
  return isAuth ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;