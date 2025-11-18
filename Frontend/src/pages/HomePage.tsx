import React, {useEffect} from "react";
import DefaultLayout from "../Layout/DefaultLayout";

// 🎨 Paleta institucional SARA centralizada en JS
const SARA_COLORS = {
    blueDark: "#0F2C4C",
    green: "#6B7A3C",
    greenLight: "#7D8B54",
    blueSoft: "#3A7B89",
    beige: "#F4F4EE",
    grayDark: "#4C4C4C",
    grayLight: "#E6E6E6",
};

const slides = [
    { id: 1, title: "Cuidado veterinario", subtitle: "Atención y bienestar para cada rescate", image: "/HomePage/sara-vet.png" },
    { id: 2, title: "Adopciones responsables", subtitle: "Conectamos familias con nuevos compañeros", image: "/HomePage/sara-col.png" },
    { id: 3, title: "Comunidad SARA", subtitle: "Sumate y ayudá a multiplicar finales felices", image: "/HomePage/sara-col2.png" },
];

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = "SARA - Plataforma de adopción responsable";
    }, []);
    return (
        <DefaultLayout>
            {/* Fondo verde institucional full-width detrás del Hero */}
            <div
                style={{
                    backgroundColor: SARA_COLORS.green,
                    padding: "3rem 0",         // respiración arriba/abajo
                    width: "100vw",            // ocupa todo el ancho de la ventana
                    position: "relative",
                    left: "50%",
                    right: "50%",
                    marginLeft: "-50vw",       // truco para romper el .container del layout
                    marginRight: "-50vw",
                    marginTop: 0,
                }}
            >
                {/* Hero en un card blanco centrado sobre el fondo verde */}
                <section
                    className="container"
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "1rem",
                        padding: "3rem",
                        boxShadow:
                            "0 10px 20px rgba(0,0,0,0.12), \
                             0 4px 6px rgba(0,0,0,0.08)", // ⭐ sombra profesional
                    }}
                >
                    <div className="row align-items-center g-5">
                        <div className="col-12 col-lg-6">
                            <h1
                                className="display-5 fw-bold"
                                style={{ color: SARA_COLORS.blueDark }}
                            >
                                SARA
                            </h1>

                            <p
                                className="lead"
                                style={{ color: SARA_COLORS.grayDark }}
                            >
                                Plataforma para conectar animales rescatados con familias responsables.
                            </p>

                            <div className="d-flex gap-3 mt-4">
                                <button
                                    className="btn btn-lg"
                                    type="button"
                                    disabled
                                    style={{
                                        backgroundColor: SARA_COLORS.blueDark,
                                        borderColor: SARA_COLORS.blueDark,
                                        color: "#FFFFFF",
                                        fontWeight: 600,
                                        paddingInline: "1.75rem",
                                    }}
                                >
                                    Explorar animales
                                </button>
                            </div>
                        </div>

                        {/* Columna derecha: carrusel visual */}
                        <div className="col-12 col-lg-6">
                            <div
                                id="homeCarousel"
                                className="carousel slide shadow rounded overflow-hidden"
                                data-bs-ride="carousel"
                                style={{
                                    borderColor: SARA_COLORS.grayLight,
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                }}
                            >
                                <div className="carousel-indicators">
                                    {slides.map((s, idx) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            data-bs-target="#homeCarousel"
                                            data-bs-slide-to={idx}
                                            className={idx === 0 ? "active" : ""}
                                            aria-current={idx === 0}
                                            aria-label={`Slide ${idx + 1}`}
                                            style={{
                                                backgroundColor:
                                                    idx === 0 ? SARA_COLORS.blueSoft : SARA_COLORS.grayLight,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="carousel-inner">
                                    {slides.map((s, idx) => (
                                        <div
                                            key={s.id}
                                            className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                        >
                                            <div className="position-relative" style={{ height: "min(60vh, 520px)" }}>
                                                <img
                                                    src={s.image}
                                                    className="d-block w-100 h-100 object-fit-cover"
                                                    alt={s.title}
                                                />
                                                <div
                                                    className="carousel-caption d-none d-md-block"
                                                    style={{
                                                        background: "rgba(15, 44, 76, 0.65)",
                                                        borderRadius: "0.75rem",
                                                        padding: "0.75rem 1rem",
                                                    }}
                                                >
                                                    <h5 className="fw-bold" style={{ color: "#FFFFFF" }}>
                                                        {s.title}
                                                    </h5>
                                                    <p style={{ color: "#F4F4EE" }}>{s.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#homeCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#homeCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* SECCIÓN DE VALORES (full width) */}
            <section
                className="py-5 border-top"
                style={{
                    backgroundColor: SARA_COLORS.beige,
                    width: "100vw",
                    position: "relative",
                    left: "50%",
                    right: "50%",
                    marginLeft: "-50vw",
                    marginRight: "-50vw",
                }}
            >
                <div className="container-fluid px-5">
                    <div className="row text-center g-4 justify-content-center">
                        <div className="col-12 col-md-4">
                            <i
                                className="bi bi-heart-fill fs-1"
                                style={{ color: SARA_COLORS.green }}
                            />
                            <h5 className="mt-3" style={{ color: SARA_COLORS.blueDark }}>
                                Cuidado y bienestar
                            </h5>
                            <p style={{ color: SARA_COLORS.grayDark }}>
                                Trabajamos para que cada animal encuentre un hogar ideal.
                            </p>
                        </div>

                        <div className="col-12 col-md-4">
                            <i
                                className="bi bi-people-fill fs-1"
                                style={{ color: SARA_COLORS.blueDark }}
                            />
                            <h5 className="mt-3" style={{ color: SARA_COLORS.blueDark }}>
                                Comunidad
                            </h5>
                            <p style={{ color: SARA_COLORS.grayDark }}>
                                Sumate como adoptante o voluntario y cambiá vidas.
                            </p>
                        </div>

                        <div className="col-12 col-md-4">
                            <i
                                className="bi bi-shield-check fs-1"
                                style={{ color: SARA_COLORS.blueSoft }}
                            />
                            <h5 className="mt-3" style={{ color: SARA_COLORS.blueDark }}>
                                Transparencia
                            </h5>
                            <p style={{ color: SARA_COLORS.grayDark }}>
                                Procesos claros y responsables en cada paso.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default HomePage;
