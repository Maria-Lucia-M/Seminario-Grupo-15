import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../Layout/DefaultLayout';

// Paleta SARA compartida con el resto del sitio
const SARA_COLORS = {
    blueDark: '#0F2C4C',
    green: '#6B7A3C',
    greenLight: '#7D8B54',
    blueSoft: '#3A7B89',
    beige: '#F4F4EE',
    grayDark: '#4C4C4C',
    grayLight: '#E6E6E6',
};

// Mock simple alineado con ListadoAnimales (mismas rutas en /public/AnimalesEj)
const MOCK_ANIMALES = [
    { id: '1', nombre: 'Bandido', especie: 'Gato',  edad: '2 años',  foto: '/AnimalesEj/Bandido.jpg',  descripcion: 'Curioso y juguetón. Se adapta bien a departamentos.' },
    { id: '2', nombre: 'Esteban', especie: 'Perro', edad: '1 año',   foto: '/AnimalesEj/Esteban.jpg',  descripcion: 'Energético y leal. Ideal para familias activas.' },
    { id: '3', nombre: 'Miguel',  especie: 'Gato',  edad: '3 años',  foto: '/AnimalesEj/Miguel.jpg',   descripcion: 'Tranquilo y cariñoso. Perfecto para compañía.' },
    { id: '4', nombre: 'Rogelio', especie: 'Perro', edad: '8 meses', foto: '/AnimalesEj/Rogelio.jpg',  descripcion: 'Cachorro sociable en aprendizaje.' },
];

const DetalleAnimal: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Buscamos el animal según el id de la URL
    const animal = useMemo(() => MOCK_ANIMALES.find(a => a.id === id), [id]);

    // Actualizamos el título de la pestaña del navegador
    useEffect(() => {
        document.title = animal ? `SARA - ${animal.nombre}` : 'SARA - Detalle animal';
    }, [animal]);

    return (
        <DefaultLayout>
            {/* Fondo verde que enmarca la tarjeta blanca de detalle */}
            <div
                style={{
                    backgroundColor: SARA_COLORS.green,
                    padding: '3rem 0 4rem',
                    width: '100%',
                }}
            >
                {/* “Card” principal de detalle */}
                <section
                    className="container"
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow:
                            '0 10px 20px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.08)',
                    }}
                >
                    {/* Link superior para volver al listado */}
                    <button
                        className="btn btn-link mb-3"
                        onClick={() => navigate('/adoptar')}
                        style={{
                            color: SARA_COLORS.blueDark,
                            textDecoration: 'none',
                            fontWeight: 600,
                        }}
                    >
                        ← Volver al listado
                    </button>

                    {!animal ? (
                        // Estado: no se encontró el animal
                        <div className="text-center py-5">
                            <h2
                                className="h4"
                                style={{ color: SARA_COLORS.blueDark, fontWeight: 700 }}
                            >
                                Animal no encontrado
                            </h2>
                            <p className="text-muted">
                                El animal que buscás no existe o fue removido.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/adoptar')}
                            >
                                Ir a Adoptar
                            </button>
                        </div>
                    ) : (
                        // Estado: detalle del animal
                        <div className="row g-4 align-items-center">
                            {/* Columna izquierda: imagen grande del animal */}
                            <div className="col-12 col-lg-6">
                                <div
                                    style={{
                                        height: 380,
                                        borderRadius: '1rem',
                                        overflow: 'hidden',
                                        backgroundColor: '#f3f4f6',
                                    }}
                                >
                                    <img
                                        src={animal.foto}
                                        alt={animal.nombre}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Columna derecha: información centrada vertical y visualmente */}
                            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                                {/* Wrapper para centrar y limitar ancho del contenido */}
                                <div
                                    style={{
                                        maxWidth: '500px',
                                        margin: '0 auto',
                                        textAlign: 'center',
                                    }}
                                >
                                    <h1
                                        className="h3 mb-3"
                                        style={{
                                            color: SARA_COLORS.blueDark,
                                            fontWeight: 800,
                                        }}
                                    >
                                        {animal.nombre}
                                    </h1>

                                    <p
                                        className="mb-2"
                                        style={{ color: SARA_COLORS.grayDark }}
                                    >
                                        <strong>{animal.especie}</strong> • {animal.edad}
                                    </p>

                                    <p
                                        className="mb-4"
                                        style={{
                                            color: SARA_COLORS.grayDark,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {animal.descripcion}
                                    </p>

                                    {/* Etiquetas de estado / características */}
                                    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <span
                        className="badge rounded-pill"
                        style={{
                            backgroundColor: SARA_COLORS.beige,
                            color: SARA_COLORS.blueDark,
                        }}
                    >
                      Vacunas al día
                    </span>
                                        <span
                                            className="badge rounded-pill"
                                            style={{
                                                backgroundColor: SARA_COLORS.beige,
                                                color: SARA_COLORS.blueDark,
                                            }}
                                        >
                      Castrado/a
                    </span>
                                        <span
                                            className="badge rounded-pill"
                                            style={{
                                                backgroundColor: SARA_COLORS.beige,
                                                color: SARA_COLORS.blueDark,
                                            }}
                                        >
                      Sociable
                    </span>
                                    </div>

                                    {/* Botones centrados con buen espaciado */}
                                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-3">
                                        <button
                                            className="btn btn-lg"
                                            disabled
                                            style={{
                                                backgroundColor: SARA_COLORS.blueDark,
                                                color: '#fff',
                                                borderColor: SARA_COLORS.blueDark,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Postularme para adoptar
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </DefaultLayout>
    );
};

export default DetalleAnimal;
