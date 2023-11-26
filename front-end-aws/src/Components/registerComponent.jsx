import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useHistory depuis react-router-dom
import '../css/Connection.css';

const RegistrationForm = () => {
  const history = useNavigate(); // Initialisez useHistory

  // State pour stocker les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  });

  // Fonction de gestion des changements de champ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Effectuez votre requête ici, par exemple avec fetch
      await fetch('https://9bbdznsjw8.execute-api.us-east-1.amazonaws.com/dev/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          response.json()
            .then((data) => {
              window.alert(data)
            })
            
          
          // throw new Error(`Erreur de réseau : ${response.status}`);
        }
        return response.json(); // Renvoie une nouvelle promesse
      })
      .then((data) => {
        console.log(data)
    })
      // if (response.ok) {
      //   // Si la requête est réussie, naviguez vers la page de connexion
      //   history('/login')
      // } else {
      //   console.log()
      //   console.error('Échec de la requête');
      // }
    } 
    catch (error) {
      console.error('Erreur lors de la requête', error);
    }
  };

  return (
    
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="username"
            required
            placeholder="Enter your email"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
  
  );
};

export default RegistrationForm;
