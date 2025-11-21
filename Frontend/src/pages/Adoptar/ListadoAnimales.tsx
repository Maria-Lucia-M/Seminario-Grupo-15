import React, { useEffect } from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
import { useNavigate } from "react-router-dom";

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

// Placeholder de animales
const MOCK_ANIMALES = [
    { id: "1", nombre: "Bandido", especie: "Gato",  edad: "2 años",    foto: "/AnimalesEj/Bandido.jpg" },
    { id: "2", nombre: "Esteban", especie: "Perro", edad: "1 año",     foto: "/AnimalesEj/Esteban.jpg" },
    { id: "3", nombre: "Miguel",  especie: "Gato",  edad: "3 años",    foto: "/AnimalesEj/Miguel.jpg" },
    { id: "4", nombre: "Rogelio", especie: "Perro", edad: "8 meses",   foto: "/AnimalesEj/Rogelio.jpg" },
];

const ListadoAnimales: React.FC = () => {
    useEffect(() => {
        document.title = "SARA - Animales disponibles";
    }, []);

    const navigate = useNavigate();


    return (
        <DefaultLayout>

            {/* Fondo verde full-width, coherente con el Hero */}
            <div
                style={{
                    backgroundColor: SARA_COLORS.green,
                    padding: "3rem 0 4rem",
                    width: "100%",
                    minHeight: "calc(100vh - 250px)", // ocupa pantalla sin romper footer
                }}
            >
                {/* Panel blanco tipo “card grande” como el Hero */}
                <section
                    className="container"
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "1rem",
                        padding: "3rem",
                        boxShadow:
                            "0 10px 20px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* Título y descripción */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h1
                                className="h3 mb-1"
                                style={{ color: SARA_COLORS.blueDark, fontWeight: 700 }}
                            >
                                Animales disponibles
                            </h1>
                            <p className="mb-0" style={{ color: SARA_COLORS.grayDark }}>
                                Explorá los animales listos para adopción.
                            </p>
                        </div>
                    </div>

                    {/* Grilla de cards */}
                    <div className="row g-4">
                        {MOCK_ANIMALES.map((a) => (
                            <div
                                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                                key={a.id}
                            >
                                <div
                                    className="card h-100"
                                    style={{
                                        borderRadius: "1rem",
                                        overflow: "hidden",
                                        border: "none",
                                        backgroundColor: "#FFFFFF",
                                        boxShadow:
                                            "0 10px 20px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {/* Imagen ocupando todo el recuadro */}
                                    <div
                                        style={{
                                            height: 200,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={a.foto}
                                            alt={a.nombre}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h5
                                            className="card-title mb-1"
                                            style={{ color: SARA_COLORS.blueDark, fontWeight: 600 }}
                                        >
                                            {a.nombre}
                                        </h5>

                                        <p
                                            className="card-text mb-2"
                                            style={{ color: SARA_COLORS.grayDark }}
                                        >
                                            {a.especie} • {a.edad}
                                        </p>

                                        <div className="mt-auto d-grid">
                                            <button
                                                className="btn btn-lg"
                                                type="button"
                                                onClick={() => navigate(`/adoptar/detalle/${a.id}`)}
                                                style={{
                                                    backgroundColor: SARA_COLORS.blueDark,
                                                    borderColor: SARA_COLORS.blueDark,
                                                    color: "#FFFFFF",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Ver detalle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
};

export default ListadoAnimales;
