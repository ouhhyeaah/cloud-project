import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importez useNavgate depuis react-router-dom
import { Link } from "react-router-dom";
import "../css/Connection.css";

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialisez useHistory

  // State pour stocker les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      await fetch(
        "https://9bbdznsjw8.execute-api.us-east-1.amazonaws.com/dev/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          return response.json(); // Renvoie une nouvelle promesse
        })
        .then((data) => {
          if(data.message){window.alert(data.message)}
          
          localStorage.setItem("token", data.token);
          localStorage.setItem('username', data.user.username)

          navigate("/");
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Connexion </h3>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />

          <button onClick={handleLogin}>Se connecter</button>
        </form>

        <Link to={'/register'}> Creer un compte maintenant !</Link>
      </div>
    </div>
  );
};

export default LoginForm;
