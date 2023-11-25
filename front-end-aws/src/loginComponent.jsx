import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useHistory depuis react-router-dom

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialisez useHistory

  // State pour stocker les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Fonction de gestion des changements de champ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Effectuez votre requête ici, par exemple avec fetch
      await fetch('https://9bbdznsjw8.execute-api.us-east-1.amazonaws.com/dev/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                },
                body: JSON.stringify(formData),
            })
            .then((response) => {
                if (!response.ok) {throw new Error(`Erreur de réseau : ${response.status}`);}
                return response.json(); // Renvoie une nouvelle promesse
            })
            .then((data) => {
                const token = data.token

                localStorage.setItem('token', token)

                onLogin(true);
                
                navigate('/home')
            })
              .catch((error) => {
                console.error('Erreur lors de la récupération des données :', error);
              });
            
    } catch (error) {
      console.error('Erreur lors de la requête', error);
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="email"
          name="username"
          required
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button onClick={handleLogin}>Se connecter</button>
    </form>
  );
};

export default LoginForm;