import RegistrationForm from "./registerComponent";
import LoginForm from "./loginComponent";
import './Connection.css'
import { Link } from "react-router-dom";


const Connection = () => {
    return(
        <div className="container">
            <div className="card">
                <h3> Inscription </h3>
                < RegistrationForm />
                <Link to='/login'> Deja uin compte ?</Link>
            </div>    
        </div>
    )
}

export default Connection;