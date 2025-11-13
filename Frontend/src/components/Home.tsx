import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home() {
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    if (auth.isLoading) {
        return <div>Cargando sesión...</div>
    }

    console.log(`[Home] Usuario autenticado: ${user?.email} como ${user?.rol}`)
    if (!auth.isAuthenticated || !user) {
        console.log("[Home] Usuario no autenticado, redirigiendo a /login")
        return <Navigate to="/login" replace />
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
        try{
            auth.logout();
            navigate('/login', { replace: true });
        } catch(error){
            console.error("Error en el logout:", error);
        }
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">Sistema SARA</h1>
                <p className="text-muted fs-5">Seleccioná boton para comenzar:</p>
            </div>

            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            <div className="d-grid gap-3">

                                <button onClick={() => navigate("/cuu/registro-animal")} className="btn btn-primary btn-lg py-3">
                                    Registro alta de animal
                                </button>

                                <button onClick={() => navigate("/cuu/valida-rescatista")} className="btn btn-outline-primary btn-lg py-3">
                                    Registrar rescate animal
                                </button>

                                <button onClick={() => navigate("/cuu/lista-negra")} className="btn btn-outline-danger btn-lg py-3">
                                    Registrar lista negra
                                </button>

                                <button onClick={() => navigate("/cuu/colocacion-vacunas")} className="btn btn-outline-success btn-lg py-3">
                                    Registrar colocación de vacunas
                                </button>

                                <button onClick={() => navigate("/cuu/alta-entrevista")} className="btn btn-outline-secondary btn-lg py-3">
                                    Alta de entrevista
                                </button>

                                <button onClick={() => navigate("/cuu/listar-entrevistas")} className="btn btn-outline-dark btn-lg py-3">
                                    Listar Entrevistas
                                </button>

                                <button onClick={() => navigate("/cuu/registrar-seguimiento")} className="btn btn-outline-info btn-lg py-3">
                                    Registrar seguimiento
                                </button>

                                <button onClick={() => navigate("/cuu/aprobar-entrevista")} className="btn btn-outline-dark btn-lg py-3">
                                    Aprobar entrevista
                                </button>

                                <button onClick={handleLogout} className="btn btn-danger btn-lg py-3 mt-4">
                                    Cerrar Sesión
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
