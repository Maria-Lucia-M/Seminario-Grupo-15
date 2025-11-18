import React from "react";
import { Link, Outlet } from "react-router-dom";
import saraLogo from "./sara-logo.png";

// 🎨 Paleta institucional SARA centralizada en JS (sin CSS externo)
const SARA_COLORS = {
    blueDark: "#0F2C4C",     // Azul principal: identidad fuerte de SARA
    green: "#6B7A3C",        // Verde institucional: naturaleza y protección
    greenLight: "#7D8B54",   // Verde suave: se puede usar para estados secundarios
    blueSoft: "#3A7B89",     // Azul verdoso: color de acento amable
    beige: "#F4F4EE",        // Fondo cálido para barras y secciones
    grayDark: "#4C4C4C",     // Texto secundario
    grayLight: "#E6E6E6",    // Bordes y separadores muy sutiles
};

// Layout por defecto de la aplicación SARA.
// Envuelve todas las páginas con la misma estructura: header, contenido y footer.
const DefaultLayout: React.FC<React.PropsWithChildren> = React.memo(({ children }) => {
    // Obtenemos el año actual para mostrarlo en el footer
    const year = new Date().getFullYear();

    return (
        <>
            {/* ================== HEADER / NAVBAR ================== */}
            <header>
                <nav
                    className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top"
                    style={{ backgroundColor: SARA_COLORS.beige, borderBottom: `1px solid ${SARA_COLORS.grayLight}` }}
                >
                    <div className="container">
                        <Link
                            className="navbar-brand d-flex align-items-center gap-2 fw-bold"
                            to="/"
                            style={{ color: SARA_COLORS.blueDark }}
                        >
                            <img src={saraLogo} alt="SARA" width="80" height="80" />
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mainNavbar"
                            aria-controls="mainNavbar"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="mainNavbar">
                            <style>{`
          .nav-link.custom-link { 
            position: relative; 
            font-weight: 700; 
          }
          .nav-link.custom-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 4px;
            height: 2px;
            width: 0;
            background: currentColor;
            transition: width 200ms ease-in-out;
          }
          .nav-link.custom-link:hover::after { 
            width: 100%; 
          }
        `}</style>

                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link custom-link"
                                        to="/"
                                        style={{ color: SARA_COLORS.blueDark }}
                                    >
                                        Inicio
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link custom-link"
                                        to="/adoptar"
                                        style={{ color: SARA_COLORS.blueDark }}
                                    >
                                        Adoptar
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link custom-link"
                                        to="/nosotros"
                                        style={{ color: SARA_COLORS.blueDark }}
                                    >
                                        Sobre nosotros
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link custom-link"
                                        to="/contacto"
                                        style={{ color: SARA_COLORS.blueDark }}
                                    >
                                        Contacto
                                    </Link>
                                </li>
                            </ul>

                            {/* Login responsive: botón en mobile, ícono en desktop */}
                            <div className="d-flex align-items-center">
                                {/* Mobile: botón con separación debajo del menú */}
                                <div className="d-lg-none mt-3 w-100 text-center">
                                    <Link
                                        className="btn btn-sm"
                                        to="/login"
                                        style={{
                                            backgroundColor: SARA_COLORS.blueDark,
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            width: "100%",
                                            paddingInline: "1.25rem",
                                        }}
                                    >
                                        Login
                                    </Link>
                                </div>

                                {/* Desktop: solo ícono de usuario */}
                                <div className="d-none d-lg-flex">
                                    <Link
                                        to="/login"
                                        title="Iniciar sesión"
                                        style={{
                                            color: SARA_COLORS.blueDark,
                                            fontSize: "1.6rem",
                                            padding: "0.4rem 0.6rem",
                                            borderRadius: "0.5rem",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "background-color 0.2s ease, transform 0.2s ease",
                                        }}
                                    >
                                        <i className="bi bi-person-circle" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>


            {/* ================== CONTENIDO PRINCIPAL ================== */}
            {/* Fondo general neutro, el contenido principal va en blanco para resaltar las vistas. */}
            <main
                style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "#FFFFFF",
                }}
            >
                {children ? children : <Outlet />}
            </main>


            {/* ================== FOOTER ================== */}
            <footer
                className="py-4 border-top"
                style={{
                    backgroundColor: SARA_COLORS.beige,
                    boxShadow: "0 -4px 10px rgba(0,0,0,0.08)",  // ⭐ sombra superior
                }}
            >
                <div className="container text-center">

                    {/* Nombre + año */}
                    <p
                        className="mb-1"
                        style={{
                            color: SARA_COLORS.blueDark,
                            fontWeight: 600,
                            letterSpacing: "0.5px"
                        }}
                    >
                        SARA &copy; {year}
                    </p>

                    {/* Descripción breve */}
                    <p className="small mb-3" style={{ color: SARA_COLORS.grayDark }}>
                        Plataforma para promover adopciones responsables y el bienestar animal.
                    </p>

                    {/* Iconos sociales (Bootstrap Icons) */}
                    <div className="d-flex justify-content-center gap-4">
                        <i
                            className="bi bi-facebook"
                            style={{ fontSize: "1.25rem", color: SARA_COLORS.blueDark, cursor: "pointer" }}
                        ></i>
                        <i
                            className="bi bi-instagram"
                            style={{ fontSize: "1.25rem", color: SARA_COLORS.blueDark, cursor: "pointer" }}
                        ></i>
                        <i
                            className="bi bi-envelope"
                            style={{ fontSize: "1.25rem", color: SARA_COLORS.blueDark, cursor: "pointer" }}
                        ></i>
                    </div>

                </div>
            </footer>
        </>
    );
});

export default DefaultLayout;
