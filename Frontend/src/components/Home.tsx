import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h1>Sistema SARA</h1>
                <p>Seleccioná un caso de uso para comenzar:</p>

                <div className="cuu-buttons">
                <Link to="/cuu/registro-animal" className="cuu-button">Registro alta de animal</Link>
                <Link to="/valida-rescatista" className="cuu-button">Registrar rescate animal</Link>
                <Link to="/cuu/lista-negra" className="cuu-button">Registrar lista negra</Link>
                <Link to="/cuu/colocacion-vacunas" className="cuu-button">Registrar colocación de vacunas</Link>
                <Link to="/cuu/alta-entrevista" className="cuu-button">Alta de entrevista</Link>
                <Link to="/cuu/registrar-seguimiento" className="cuu-button">Registrar seguimiento</Link>
                <Link to="/cuu/aprobar-entrevista" className="cuu-button">Aprobar entrevista</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;