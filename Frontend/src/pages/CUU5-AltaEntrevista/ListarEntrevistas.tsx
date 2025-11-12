import { useState, useEffect } from "react";
import { API_URL } from "../../rutasGenericas"; //
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

interface EntrevistaDTO {
    id: string; 
    nro_animal: string;
    id_colaborador: string;
    fecha_entrevista: Date;
    hora_entrevista: string;
    dni_adoptante: number;
    estado: string;
}

export default function EntrevistaListPage() {
    const [entrevistas, setEntrevistas] = useState<EntrevistaDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/entrevistas`)
            .then(res => {
                setEntrevistas(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar entrevistas:", err);
                setLoading(false);
                Swal.fire("Error", "No se pudieron cargar las entrevistas", "error");
            });
    }, []); 

    if (loading) {
        return <h2 className="text-center mt-5">Cargando entrevistas...</h2>;
    }

    return (
        <div className="container py-5">
            <div className="col-md-10 mx-auto">
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center text-primary">Listado de Entrevistas</h2>
                        
                        {entrevistas.length === 0 ? (
                            <p className="text-center text-muted">No se encontraron entrevistas registradas.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID (Mongo)</th>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Estado</th>
                                            <th>DNI Adoptante</th>
                                            <th>N° Animal</th>
                                            <th>ID Colaborador</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {}
                                        {entrevistas.map((ent) => (
                                            <tr key={ent.id}>
                                                <td>{ent.id}</td>
                                                <td>{new Date(ent.fecha_entrevista).toLocaleDateString()}</td>
                                                <td>{ent.hora_entrevista}</td>
                                                <td>
                                                    <span className={`badge ${ent.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                        {ent.estado}
                                                    </span>
                                                </td>
                                                <td>{ent.dni_adoptante}</td>
                                                <td>{ent.nro_animal}</td>
                                                <td>{ent.id_colaborador}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}