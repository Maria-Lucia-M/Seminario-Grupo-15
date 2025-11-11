import { useState } from "react";
import { API_URL } from "../../rutasGenericas.ts";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegistrarSeguimiento() {
    const [form, setForm] = useState({
        nro_adopcion: "",
        fecha_seguimiento: "",
        estado_animal: "",
        entorno: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data, status } = await axios.post(`${API_URL}/seguimientos`, form);

            if (status === 201) {
                Swal.fire({
                icon: "success",
                title: "Seguimiento registrado",
                text: "El seguimiento fue guardado correctamente.",
            });

            setForm({
                nro_adopcion: "",
                fecha_seguimiento: "",
                estado_animal: "",
                entorno: "",
            });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Registro incompleto",
                    text: data.message || "Revisá los datos ingresados.",
                });
            };
        } catch (error: unknown) {
            console.error("Error al registrar:", error);
            let message = "No se pudo conectar con el backend.";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || error.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            };
            Swal.fire({
                icon: "error",
                title: "Error de servidor",
                text: message,
            });
        };
    };

    return (
        <div className="container py-5">
            <div className="col-md-8 mx-auto">
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center text-primary">Registrar Seguimiento</h2>

                        <form onSubmit={handleSubmit} className="d-grid gap-3">
                            <input
                                type="text"
                                name="nro_adopcion"
                                value={form.nro_adopcion}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Número de adopción"
                                required
                            />

                            <input
                                type="date"
                                name="fecha_seguimiento"
                                value={form.fecha_seguimiento}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />

                            <select
                                name="estado_animal"
                                value={form.estado_animal}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">Estado del animal</option>
                                <option value="Apto">Apto</option>
                                <option value="No apto">No apto</option>
                            </select>

                            <input
                                type="text"
                                name="entorno"
                                value={form.entorno}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Descripción del entorno"
                                required
                            />

                            <button type="submit" className="btn btn-success btn-lg">
                                Registrar Seguimiento
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
