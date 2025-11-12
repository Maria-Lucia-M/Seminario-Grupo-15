import { useState, useEffect } from "react";
import { API_URL } from "../../rutasGenericas";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

interface Animal {
  nro: number;
  especie: string;
  raza: string;
  estado: string;
}

interface Persona {
  dni: number;
  nombre: string;
  apellido: string;
  adoptante: { estado: string } | null;
  id_colaborador?: string; 
  colaborador: any;
}

const estadoInicial = {
    fecha_entrevista: "",
    hora_entrevista: "",
    dni_adoptante: "", 
    nro_animal: "",   
    id_colaborador: "", 
};

export default function AltaEntrevistaPage() {
    const [form, setForm] = useState(estadoInicial);
    
    const [animales, setAnimales] = useState<Animal[]>([]);
    const [adoptantes, setAdoptantes] = useState<Persona[]>([]);
    const [colaboradores, setColaboradores] = useState<Persona[]>([]);
    
    useEffect(() => {
        const cargarListas = async () => {
            try {
                // Pedimos los animales
                const resAnimales = await axios.get(`${API_URL}/animales`);
                const animalesData = Array.isArray(resAnimales.data) ? resAnimales.data : [];
                const animalesAptos = animalesData.filter(
                    (a: Animal) => a.estado === 'Apto'
                );
                setAnimales(animalesAptos);

                // Pedimos adoptantes aptos
                const resAdoptantes = await axios.get(`${API_URL}/personas/adoptantes-aptos`);
                setAdoptantes(Array.isArray(resAdoptantes.data) ? resAdoptantes.data : []); 

                // Pedimos colaboradores
                const resColaboradores = await axios.get(`${API_URL}/personas/colaboradores`);
                setColaboradores(Array.isArray(resColaboradores.data) ? resColaboradores.data : []);

            } catch (error) {
                console.error("Error cargando listas:", error);
                Swal.fire("Error", "No se pudieron cargar los datos para los formularios", "error");
            }
        };

        cargarListas();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data, status } = await axios.post(`${API_URL}/altaEnt`, form);
            if (status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Entrevista Registrada",
                    text: data.message || "La entrevista fue guardada correctamente.",
                });
                setForm(estadoInicial);
            }
        } catch (error: unknown) {
            console.error("Error al registrar:", error);
            let message = "No se pudo conectar con el backend.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || error.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            Swal.fire({
                icon: "error",
                title: "Error de Validación",
                text: message,
            });
        }
    };

    return (
        <div className="container py-5">
            <div className="col-md-8 mx-auto">
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center text-primary">Registrar Alta de Entrevista</h2>
                        
                        <form onSubmit={handleSubmit} className="d-grid gap-3">
                            {}
                            <label htmlFor="fecha_entrevista">Fecha de Entrevista</label>
                            <input
                                type="date"
                                id="fecha_entrevista"
                                name="fecha_entrevista"
                                value={form.fecha_entrevista}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />

                            <label htmlFor="hora_entrevista">Hora (ej: 10:30)</label>
                            <input
                                type="time"
                                id="hora_entrevista"
                                name="hora_entrevista"
                                value={form.hora_entrevista}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            
                            <label htmlFor="dni_adoptante">DNI del Adoptante</label>
                            <select
                                id="dni_adoptante"
                                name="dni_adoptante"
                                value={form.dni_adoptante}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">--- Seleccione un adoptante ---</option>
                                {adoptantes && adoptantes.map((p) => (
                                    <option key={p.dni} value={p.dni}>
                                        {p.nombre} {p.apellido} (DNI: {p.dni})
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="nro_animal">N° de Animal</label>
                            <select
                                id="nro_animal"
                                name="nro_animal"
                                value={form.nro_animal}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">--- Seleccione un animal (solo aptos) ---</option>
                                {animales && animales.map((a) => (
                                    <option key={a.nro} value={a.nro}>
                                        N°{a.nro} - {a.especie} ({a.raza})
                                    </option>
                                ))}
                            </select>

                            {}
                            <label htmlFor="id_colaborador">ID de Colaborador (Quien registra)</label>
                            <select
                                id="id_colaborador"
                                name="id_colaborador"
                                value={form.id_colaborador}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">--- Seleccione un colaborador ---</option>
                                {
                                  colaboradores && 
                                  colaboradores.filter(p => p && p.id_colaborador) 
                                  .map((p) => (
                                    <option key={p.id_colaborador} value={p.id_colaborador}>
                                        {p.nombre} {p.apellido} (ID: {p.id_colaborador})
                                    </option>
                                  ))
                                }
                            </select>

                            <button type="submit" className="btn btn-success btn-lg mt-3">
                                Registrar Entrevista
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}