import RegistrationForm from "./registerComponent";
import LoginForm from "./loginComponent";
import './Connection.css'


const Connection = () => {
    return(
        <div className="container">
            <div className="card">
                < RegistrationForm />
                <p className="result">

                </p>
            </div>    
        </div>
    )
}

export default Connection;