// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './registerComponent';
import Home from './Home';
import Login from './loginComponent';
import Connection from './Connection';
import PrivateRoute from './PrivateRoute';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifiez la présence du token ou effectuez toute logique d'authentification
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
  };

  return (

    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            }
          isAuth={isAuthenticated}
        />
        <Route path="/register" Component={RegisterForm} /> 
        <Route path="/login"  element={<Login onLogin={handleLogin} />} />
        <Route path='/' Component={Connection} ></Route>
      </Routes>
    </Router>
  );
};

export default App;
