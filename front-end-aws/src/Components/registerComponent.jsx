import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom"; // Importez useHistory depuis react-router-dom
import "../css/Connection.css";

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialisez useHistory

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  // State pour stocker les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    coutry: "",
    address:"",
    postal_code:"",
    city: "",
    email: "",
    phone_number:"",
    job:"",
    password: "",
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
      await fetch(
        "https://9bbdznsjw8.execute-api.us-east-1.amazonaws.com/dev/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            response.json().then((data) => {
              window.alert(data);
            });

            // throw new Error(`Erreur de réseau : ${response.status}`);
          }
          return response.json(); // Renvoie une nouvelle promesse
        })
        .then((data) => {
          navigate('/login')
        });
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="last_name"
            required
            placeholder="Enter your last name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="first_name"
            required
            placeholder="Enter your first name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <Select
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          />
          <input
            type="text"
            name="address"
            required
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postal_code"
            required
            placeholder="Enter your postal code"
            maxLength={6}
            value={formData.postal_code}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            required
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            name="phone_number"
            required
            placeholder="Enter your phone number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            id="job"
            type="text"
            name="job"
            required
            placeholder="Enter your job/activity"
            value={formData.job}
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

        <Link to={'/login'}> Deja un compte ?</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
