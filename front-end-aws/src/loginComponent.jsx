// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Effectuez votre requête d'authentification ici
      const response = await fetch('https://9bbdznsjw8.execute-api.us-east-1.amazonaws.com/dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();

      // Vérifiez si la réponse contient un token
      if (data.token) {
        // Stockez le token dans le stockage local
        localStorage.setItem('token', data.token);


        // Redirigez l'utilisateur vers l'URL '/'
        navigate('/')
      } else {
        throw new Error('Le token est manquant dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      // Gérer les erreurs de connexion ici
    }
  };

  return (
    <div>
      <label>
        Nom d'utilisateur:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />

      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />

      <button type="button" onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default LoginForm;
