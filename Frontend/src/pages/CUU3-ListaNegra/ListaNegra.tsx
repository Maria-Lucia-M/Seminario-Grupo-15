import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../rutasGenericas";

// ---- Interfaces ----
interface Persona {
    dni: string;
    nombre: string;
    apellido: string;
    mail: string;
    contrasena: string;
    telefono: string;
}

type EstadoAdoptante = "Apto" | "No apto";

interface Adoptante extends Persona {
    _id: string;
    domicilio: string;
    estado: EstadoAdoptante;
    ListaNegra: boolean;
}

// ---- Componente principal ----
export default function ListaNegra() {
    const [adoptantes, setAdoptantes] = useState<Adoptante[]>([]);
    const [loading, setLoading] = useState(true);

    // Carga sólo las personas que el backend devuelve como lista negra
    const cargarAdoptantes = async () => {
        try {
            const res = await axios.get<Adoptante[]>(
                `${API_URL}/adoptantes/lista-negra`
            );

            // Refuerzo por si el backend alguna vez devuelve algo mezclado
            const soloEnListaNegra = res.data.filter((a) => a.ListaNegra === true);
            setAdoptantes(soloEnListaNegra);
        } catch (error) {
            console.error("Error al cargar lista negra:", error);
            Swal.fire(
                "Error",
                "No se pudieron cargar las personas en lista negra",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarAdoptantes();
    }, []);

    // Cambia el valor del atributo ListaNegra en el backend
    const cambiarListaNegra = async (a: Adoptante, nuevoEstado: boolean) => {
        const accion = nuevoEstado ? "Agregar a Lista Negra" : "Quitar de Lista Negra";

        const { isConfirmed } = await Swal.fire({
            title: accion,
            text: `¿Desea ${accion.toLowerCase()} a ${a.nombre} ${a.apellido}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        });

        if (!isConfirmed) return;

        try {
            // IMPORTANTE: esta ruta debe existir en el backend:
            // PUT /api/adoptantes/:id/lista-negra
            const resp = await axios.put(
                `${API_URL}/adoptantes/${a._id}/lista-negra`,
                { ListaNegra: nuevoEstado }
            );

            console.log("Respuesta PUT lista negra:", resp.data);

            Swal.fire("Éxito", "El estado de Lista Negra fue actualizado", "success");

            // Vuelvo a cargar la lista (como la pantalla sólo muestra ListaNegra = true,
            // si lo pasás a false va a desaparecer de la tabla)
            cargarAdoptantes();
        } catch (error: any) {
            console.error("Error en PUT lista negra:", error?.response || error);
            Swal.fire(
                "Error",
                error?.response?.data?.message || "No se pudo actualizar el estado",
                "error"
            );
        }
    };

    // Nueva función: agregar por DNI o por _id
    const handleAgregarPorInput = async () => {
        const { value: inputValue } = await Swal.fire({
            title: 'Agregar persona a Lista Negra',
            input: 'text',
            inputLabel: 'Ingrese DNI o _id del adoptante',
            inputPlaceholder: 'Ej: 12345678 o 64a1f2a3b4c5d6e7f8g9h0',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Ingresá DNI o _id válido';
                }
                return null;
            }
        });

        if (!inputValue) return;
        const query = inputValue.trim();

        try {
            // Intento buscar por DNI primero
            let adoptante: Adoptante | null = null;

            try {
                const resByDni = await axios.get<Adoptante[]>(`${API_URL}/adoptantes?dni=${encodeURIComponent(query)}`);
                if (resByDni.data && resByDni.data.length > 0) {
                    adoptante = resByDni.data[0];
                }
            } catch {
                // no encontrado por dni, lo ignoramos y probamos por id
            }

            // Si no encontré por DNI, pruebo por ID
            if (!adoptante) {
                try {
                    const resById = await axios.get<Adoptante>(`${API_URL}/adoptantes/${encodeURIComponent(query)}`);
                    if (resById.data) adoptante = resById.data;
                } catch {
                    // no encontrado por id
                }
            }

            if (!adoptante) {
                Swal.fire('No encontrado', 'No se encontró un adoptante con ese DNI ni ID.', 'warning');
                return;
            }

            // Confirmar acción
            const { isConfirmed } = await Swal.fire({
                title: 'Confirmar agregado',
                html: `Agregar a <strong>${adoptante.nombre} ${adoptante.apellido}</strong> (DNI: ${adoptante.dni}) a la Lista Negra?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, agregar',
                cancelButtonText: 'Cancelar'
            });

            if (!isConfirmed) return;

            // Ejecutar PUT para marcar ListaNegra = true
            await axios.put(`${API_URL}/adoptantes/${adoptante._id}/lista-negra`, { ListaNegra: true });
            Swal.fire('Éxito', 'La persona fue agregada a la Lista Negra', 'success');
            cargarAdoptantes();

        } catch (error: any) {
            console.error('Error agregando a lista negra:', error?.response || error);
            Swal.fire('Error', error?.response?.data?.message || 'No se pudo agregar la persona', 'error');
        }
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Personas en Lista Negra</h2>
                <div>
                    <button className="btn btn-danger me-2" onClick={() => cargarAdoptantes()}>
                        Recargar
                    </button>
                    <button className="btn btn-success" onClick={handleAgregarPorInput}>
                        Agregar persona
                    </button>
                </div>
            </div>

            {loading && <p className="text-center">Cargando...</p>}

            {!loading && adoptantes.length === 0 && (
                <p className="text-center">No hay personas en lista negra 🎉</p>
            )}

            {!loading && adoptantes.length > 0 && (
                <table className="table table-striped align-middle text-center shadow-sm">
                    <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Mail</th>
                        <th>Teléfono</th>
                        <th>Domicilio</th>
                        <th>Estado</th>
                        <th>Lista Negra</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {adoptantes.map((a) => (
                        <tr key={a._id} className="table-danger">
                            <td>{a.dni}</td>
                            <td>
                                {a.nombre} {a.apellido}
                            </td>
                            <td>{a.mail}</td>
                            <td>{a.telefono}</td>
                            <td>{a.domicilio}</td>
                            <td>{a.estado}</td>
                            <td>{a.ListaNegra ? "🔴 Sí" : "⚪ No"}</td>
                            <td>
                                {/* Botón QUITAR: activo sólo si está en lista negra */}
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    disabled={!a.ListaNegra}
                                    onClick={() => cambiarListaNegra(a, false)}
                                >
                                    Quitar
                                </button>

                                {/* Botón AGREGAR: lo dejo por si más adelante listás otros adoptantes también,
                      ahora mismo siempre va a estar deshabilitado porque esta pantalla
                      sólo muestra ListaNegra = true */}
                                <button
                                    className="btn btn-danger btn-sm"
                                    disabled={a.ListaNegra}
                                    onClick={() => cambiarListaNegra(a, true)}
                                >
                                    Agregar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
