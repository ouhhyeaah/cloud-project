import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            Liste des choix :
            <div>
                <Link to="/register">S'enregistrer</Link>
            </div>
            <div>
                <Link to="/login">Se connecter</Link>
            </div>
        </div>
    )
}

export default Home;