import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../rutasGenericas.ts';
import './ListaNegraPage.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface Persona {
  _id: string;
  dni: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  // Campos del discriminador Adoptante son planos en el backend
  estado: string;
  domicilio: string;
  enListaNegra: boolean;
}

const ListaNegraPage: React.FC = () => {
  const [adoptantesListaNegra, setAdoptantesListaNegra] = useState<Persona[]>([]);
  const [todosAdoptantes, setTodosAdoptantes] = useState<Persona[]>([]);
  const [vistaActual, setVistaActual] = useState<'listaNegra' | 'gestion'>('listaNegra');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const authHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
  };

  const handleAxiosError = useCallback((error: unknown, fallbackMessage: string) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as any)?.message || error.message;
      if (status === 401 || status === 403) {
        setMensaje('Sesión expirada o no autorizada. Iniciá sesión nuevamente.');
        setTimeout(() => navigate('/login', { replace: true }), 1200);
        return;
      }
      setMensaje(apiMessage || fallbackMessage);
      return;
    }
    setMensaje(fallbackMessage);
  }, [navigate]);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setMensaje('No hay sesión activa. Iniciá sesión nuevamente.');
        navigate('/login', { replace: true });
        return;
      }
      const [resListaNegra, resTodosAdoptantes] = await Promise.all([
        axios.get(`${API_URL}/personas/adoptantes-lista-negra`, authHeaders()),
        axios.get(`${API_URL}/personas/todos-adoptantes`, authHeaders())
      ]);

      setAdoptantesListaNegra(Array.isArray(resListaNegra.data) ? resListaNegra.data : []);
      setTodosAdoptantes(Array.isArray(resTodosAdoptantes.data) ? resTodosAdoptantes.data : []);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      handleAxiosError(error, 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [handleAxiosError, navigate]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const agregarAListaNegra = async (dni: number) => {
    const confirm = await Swal.fire({
      title: 'Agregar a lista negra',
      text: `¿Confirmás agregar al adoptante con DNI ${dni} a la lista negra?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.put(`${API_URL}/personas/lista-negra/agregar/${dni}`, null, authHeaders());
      setMensaje('Adoptante agregado a lista negra exitosamente');
      await cargarDatos();
    } catch (error) {
      console.error('Error al agregar a lista negra:', error);
      handleAxiosError(error, 'Error al agregar adoptante a lista negra');
    }
  };

  const quitarDeListaNegra = async (dni: number) => {
    const confirm = await Swal.fire({
      title: 'Quitar de lista negra',
      text: `¿Confirmás quitar al adoptante con DNI ${dni} de la lista negra?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.put(`${API_URL}/personas/lista-negra/quitar/${dni}`, null, authHeaders());
      setMensaje('Adoptante removido de lista negra exitosamente');
      await cargarDatos();
    } catch (error) {
      console.error('Error al quitar de lista negra:', error);
      handleAxiosError(error, 'Error al quitar adoptante de lista negra');
    }
  };

  const adoptantesNoEnListaNegra = todosAdoptantes.filter(
    adoptante => !adoptante.enListaNegra
  );

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="lista-negra-container">
      <h1>Gestión de Lista Negra</h1>
      
      {mensaje && (
        <div className={`mensaje ${mensaje.includes('Error') ? 'error' : 'success'}`}>
          {mensaje}
          <button onClick={() => setMensaje('')}>×</button>
        </div>
      )}

      <div className="botones-navegacion">
        <button 
          className={vistaActual === 'listaNegra' ? 'activo' : ''}
          onClick={() => setVistaActual('listaNegra')}
        >
          Ver Lista Negra ({adoptantesListaNegra.length})
        </button>
        <button 
          className={vistaActual === 'gestion' ? 'activo' : ''}
          onClick={() => setVistaActual('gestion')}
        >
          Gestionar Lista Negra
        </button>
      </div>

      {vistaActual === 'listaNegra' && (
        <div className="vista-lista-negra">
          <h2>Adoptantes en Lista Negra</h2>
          {adoptantesListaNegra.length === 0 ? (
            <p className="sin-datos">No hay adoptantes en lista negra</p>
          ) : (
            <div className="tabla-container">
              <table className="tabla-adoptantes">
                <thead>
                  <tr>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Domicilio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptantesListaNegra.map((adoptante) => (
                    <tr key={adoptante._id}>
                      <td>{adoptante.dni}</td>
                      <td>{adoptante.nombre}</td>
                      <td>{adoptante.apellido}</td>
                      <td>{adoptante.email}</td>
                      <td>{adoptante.telefono}</td>
                      <td>{adoptante.domicilio}</td>
                      <td>
                        <span className={`estado ${adoptante.estado?.toLowerCase().replace(' ', '-')}`}>
                          {adoptante.estado}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-quitar"
                          onClick={() => quitarDeListaNegra(adoptante.dni)}
                        >
                          Quitar de Lista Negra
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {vistaActual === 'gestion' && (
        <div className="vista-gestion">
          <h2>Agregar Adoptantes a Lista Negra</h2>
          {adoptantesNoEnListaNegra.length === 0 ? (
            <p className="sin-datos">Todos los adoptantes están en lista negra</p>
          ) : (
            <div className="tabla-container">
              <table className="tabla-adoptantes">
                <thead>
                  <tr>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Domicilio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptantesNoEnListaNegra.map((adoptante) => (
                    <tr key={adoptante._id}>
                      <td>{adoptante.dni}</td>
                      <td>{adoptante.nombre}</td>
                      <td>{adoptante.apellido}</td>
                      <td>{adoptante.email}</td>
                      <td>{adoptante.telefono}</td>
                      <td>{adoptante.domicilio}</td>
                      <td>
                        <span className={`estado ${adoptante.estado?.toLowerCase().replace(' ', '-')}`}>
                          {adoptante.estado}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-agregar"
                          onClick={() => agregarAListaNegra(adoptante.dni)}
                        >
                          Agregar a Lista Negra
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaNegraPage;