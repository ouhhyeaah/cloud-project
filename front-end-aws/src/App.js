// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./Components/loginComponent";
import RegistrationForm from "./Components/registerComponent";
import Home from "./Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<PrivateRoute path="/" element={<Home />} />}
        />

        <Route
          path="/login"
          element={<LoginForm onLogin={() => setIsAuthenticated(true)} />}
        />

        <Route path="/register" element={<RegistrationForm />}></Route>

        <Route path="/profile"></Route>
      </Routes>
    </Router>
  );
};

export default App;
