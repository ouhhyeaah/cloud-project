import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import CheckToken from './Controller';

const PrivateRoute = ({ path, element }) => {
  const [isTokenValid, setIsTokenValid] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupère le username et le token du stockage local
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (username && token) {
          const isValid = await CheckToken({username, token});
          setIsTokenValid(isValid);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error('Erreur lors de la validation du token :', error);
        setIsTokenValid(false);
      }
    };

    fetchData();
  }, []);

  if (isTokenValid === undefined) {
    // Attendez que la vérification du token soit terminée
    return null;
  }

  return isTokenValid ? <Routes> <Route path={path} element={element} /> </Routes>  : <Navigate to="/login" />;
};

export default PrivateRoute;