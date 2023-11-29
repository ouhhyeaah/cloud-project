import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom"; // Importez useHistory depuis react-router-dom
import { PatternFormat} from "react-number-format"; // Lib pour les formats de numéro de téléphone
import "../css/Connection.css";

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialisez useHistory

  // select input from https://codesandbox.io/p/sandbox/country-dropdown-with-react-select-w0rk6
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
  }, []);

  // State pour stocker les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    job: "",
    password: "",
  });

  const [addressData, setAddressData] = useState({
    address: "",
    postal_code: "",
    city: "",
    country: "",
  });

  // Fonction de gestion des changements de champ
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // gestion des changements de champ pour l'adresse
  const handleAddressInfoChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  }
  const handleCountryChange = (e) => {
    const value = e.value;
    setAddressData({ ...addressData, ["country"]: value });
  }
  const allData = {
    ...formData,
    ...addressData
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuez votre requête ici, par exemple avec fetch
      await fetch(
        "https://unl87haa1i.execute-api.us-east-1.amazonaws.com/dev/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allData),
        }
      )
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            response.json().then((data) => {
              window.alert(data);
            });
          }
          return response.json(); // Renvoie une nouvelle promesse
        })
        .then((data) => {
          navigate("/login");
        });
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-line">
            <h5>Personnal Informations</h5>
            <input
              className="user"
              type="text"
              name="last_name"
              required
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleUserInfoChange}
            />
            <input
              className="user"
              type="text"
              name="first_name"
              required
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleUserInfoChange}
            />
          </div>

          <div className="input-line">
            <h5>Address Informations</h5>
            <input
              type="text"
              name="postal_code"
              required
              placeholder="Enter your postal code"
              maxLength={6}
              value={formData.postal_code}
              onChange={handleAddressInfoChange}
              className={"home"}
            />
            <input
              type="text"
              name="address"
              required
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleAddressInfoChange}
              className={"home"}

            />
          </div>
          <div className="input-line">
            <input
              type="text"
              name="city"
              required
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleAddressInfoChange}
            />
            <Select
                options={countries}
                value={selectedCountry}
                name="country"
                required
                onChange={handleCountryChange}
              //onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            />
          </div>
          <div className="input-line"> 
          <h5>Contact Informations</h5>
            {/*// https://s-yadav.github.io/react-number-format/docs/intro*/}

            <PatternFormat
                format="+1 (###)-####-###"
                placeholder={"Format : (###)-####-###"}
                name={"phone_number"}
                required
                value={formData.phone_number}
                onChange={handleUserInfoChange}
            />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleUserInfoChange}
          />
          </div>
          <input
            type="text"
            name="job"
            required
            placeholder="Enter your job/activity"
            value={formData.job}
            onChange={handleUserInfoChange}
            className={"job"}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleUserInfoChange}
            className={"password"}
          />
          <button type="submit">Submit</button>
        </form>

        <Link to={"/login"}> Deja un compte ?</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
