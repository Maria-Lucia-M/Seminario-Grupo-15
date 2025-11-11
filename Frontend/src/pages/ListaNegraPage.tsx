import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListaNegraPage.css';

interface Adoptante {
    estado: 'Apto' | 'No apto';
    domicilio: string;
}

interface Persona {
    dni: string;
    nombre: string;
    apellido: string;
    mail: string;
    telefono: string;
    adoptante: Adoptante | null;
}

interface ListaNegraItem {
    adoptante: Persona;
    motivo: string;
    fecha_bloqueo: Date;
    activo: boolean;
}

const API_URL = 'http://localhost:3000/api';

const ListaNegraPage = () => {
    const [dniAdoptante, setDniAdoptante] = useState('');
    const [motivo, setMotivo] = useState('');
    const [listaNegra, setListaNegra] = useState<ListaNegraItem[]>([]);
    const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        cargarListaNegra();
    }, []);

    const cargarListaNegra = async () => {
        try {
            const response = await fetch(`${API_URL}/lista-negra`);
            if (response.ok) {
                const data = await response.json();
                setListaNegra(data);
            }
        } catch (error) {
            console.error('Error al cargar lista negra:', error);
        }
    };

    const handleAgregar = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setMensaje(null);

        try {
            const response = await fetch(`${API_URL}/lista-negra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dni_adoptante: dniAdoptante,
                    motivo: motivo,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje({ tipo: 'success', texto: 'Adoptante agregado a la lista negra exitosamente' });
                setDniAdoptante('');
                setMotivo('');
                cargarListaNegra();
            } else {
                setMensaje({ tipo: 'error', texto: data.message || 'Error al agregar a la lista negra' });
            }
        } catch (error) {
            setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor' });
        } finally {
            setCargando(false);
        }
    };

    const handleQuitar = async (dni: string) => {
        if (!confirm(`¿Estás seguro de remover a ${dni} de la lista negra?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/lista-negra/${dni}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje({ tipo: 'success', texto: data.message || 'Adoptante removido de la lista negra' });
                cargarListaNegra();
            } else {
                setMensaje({ tipo: 'error', texto: data.message || 'Error al remover de la lista negra' });
            }
        } catch (error) {
            setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor' });
        }
    };

    return (
        <div className="lista-negra-container">
            <div className="lista-negra-card">
                <div className="header-with-back">
                    <Link to="/" className="btn-volver">
                        ← Volver al Home
                    </Link>
                    <h1>Gestión de Lista Negra</h1>
                </div>

                {mensaje && (
                    <div className={`mensaje ${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}

                <div className="form-section">
                    <h2>Agregar a Lista Negra</h2>
                    <form onSubmit={handleAgregar}>
                        <div className="form-group">
                            <label htmlFor="dni">DNI del Adoptante:</label>
                            <input
                                type="text"
                                id="dni"
                                value={dniAdoptante}
                                onChange={(e) => setDniAdoptante(e.target.value)}
                                required
                                placeholder="Ej: 12345678"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="motivo">Motivo:</label>
                            <textarea
                                id="motivo"
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                required
                                placeholder="Describe el motivo del bloqueo..."
                                rows={4}
                            />
                        </div>

                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Agregando...' : 'Agregar a Lista Negra'}
                        </button>
                    </form>
                </div>

                <div className="lista-section">
                    <h2>Lista Negra Actual</h2>
                    {listaNegra.length === 0 ? (
                        <p className="sin-registros">No hay adoptantes en la lista negra</p>
                    ) : (
                        <div className="tabla-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Domicilio</th>
                                        <th>Motivo</th>
                                        <th>Fecha de Bloqueo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaNegra.map((item) => (
                                        <tr key={item.adoptante.dni}>
                                            <td>{item.adoptante.dni}</td>
                                            <td>{item.adoptante.nombre}</td>
                                            <td>{item.adoptante.apellido}</td>
                                            <td>{item.adoptante.adoptante?.domicilio || 'N/A'}</td>
                                            <td>{item.motivo}</td>
                                            <td>{new Date(item.fecha_bloqueo).toLocaleDateString('es-AR')}</td>
                                            <td>
                                                <button
                                                    className="btn-remover"
                                                    onClick={() => handleQuitar(item.adoptante.dni)}
                                                >
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListaNegraPage;

