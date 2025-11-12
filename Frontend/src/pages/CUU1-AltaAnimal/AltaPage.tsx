import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../rutasGenericas";

interface Estado {
  apto: boolean;
  no_apto: boolean;
  en_adopcion: boolean;
  adoptado: boolean;
  disponible: boolean;
  no_disponible: boolean;
}

interface Animal {
  nro: string;
  raza: string;
  edad_estimada: string;
  fecha_ingreso: string;
  fecha_defuncion: string;
  estado: Estado;
  imagen: string[];
  video: string[];
}

export default function AltaAnimal() {
  const [adaptacionCompletada, setAdaptacionCompletada] = useState<boolean | null>(null);
  const [form, setForm] = useState<Animal>({
    nro: "",
    raza: "",
    edad_estimada: "",
    fecha_ingreso: "",
    fecha_defuncion: "",
    estado: {
      apto: false,
      no_apto: false,
      en_adopcion: false,
      adoptado: false,
      disponible: false,
      no_disponible: false,
    },
    imagen: [],
    video: [],
  });

  const [animales, setAnimales] = useState<Animal[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // versión segura del cambio de estado
  const handleEstadoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof Estado;
    setForm((prev) => ({
      ...prev,
      estado: {
        apto: value === "apto",
        no_apto: value === "no_apto",
        en_adopcion: value === "en_adopcion",
        adoptado: value === "adoptado",
        disponible: value === "disponible",
        no_disponible: value === "no_disponible",
      },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: "imagen" | "video") => {
    const files = e.target.files;
    if (!files) return;
    const readers = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setForm((prev) => ({
        ...prev,
        [field]: [...prev[field], ...results],
      }));
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/animales`, form);
      Swal.fire("Éxito", "Animal agregado correctamente", "success");
      setAnimales((prev) => [...prev, form]);
      setForm({
        nro: "",
        raza: "",
        edad_estimada: "",
        fecha_ingreso: "",
        fecha_defuncion: "",
        estado: {
          apto: false,
          no_apto: false,
          en_adopcion: false,
          adoptado: false,
          disponible: false,
          no_disponible: false,
        },
        imagen: [],
        video: [],
      });
    } catch {
      Swal.fire("Error", "No se pudo agregar el animal", "error");
    }
  };

  const handleAdaptacion = (exito: boolean) => {
    if (!exito) {
      Swal.fire("Registro finalizado", "El animal fue marcado como No Apto", "info");
      const noApto = {
        ...form,
        estado: { ...form.estado, no_apto: true },
      };
      axios.post(`${API_URL}/animales`, noApto);
      setAdaptacionCompletada(false);
    } else {
      setAdaptacionCompletada(true);
    }
  };

  // Generador de key única segura
  const generarKey = (animal: Animal) => {
    return animal.nro || `${animal.raza}-${animal.fecha_ingreso}-${Math.random().toString(36).slice(2)}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Registro interno de animales</h2>

      {adaptacionCompletada === null ? (
        <div className="text-center">
          <h4>¿Completó con éxito el período de adaptación?</h4>
          <div className="mt-4">
            <button className="btn btn-danger mx-2" onClick={() => handleAdaptacion(false)}>
              NO
            </button>
            <button className="btn btn-success mx-2" onClick={() => handleAdaptacion(true)}>
              SÍ
            </button>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Edad estimada</label>
                <input
                  type="number"
                  name="edad_estimada"
                  className="form-control"
                  value={form.edad_estimada}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha de ingreso</label>
                <input
                  type="date"
                  name="fecha_ingreso"
                  className="form-control"
                  value={form.fecha_ingreso}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha de defunción (opcional)</label>
                <input
                  type="date"
                  name="fecha_defuncion"
                  className="form-control"
                  value={form.fecha_defuncion}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={Object.entries(form.estado).find(([, val]) => val)?.[0] || ""}
                  onChange={handleEstadoChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="apto">Apto</option>
                  <option value="no_apto">No Apto</option>
                  <option value="en_adopcion">En Adopción</option>
                  <option value="adoptado">Adoptado</option>
                  <option value="disponible">Disponible</option>
                  <option value="no_disponible">No Disponible</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Imagen (opcional)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="form-control"
                  onChange={(e) => handleFileChange(e, "imagen")}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Video (opcional)</label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  className="form-control"
                  onChange={(e) => handleFileChange(e, "video")}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </form>

          {animales.length > 0 && (
            <div className="mt-5">
              <h4>Animales registrados</h4>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>Nro</th>
                    <th>Edad</th>
                    <th>Fecha ingreso</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {animales.map((a) => (
                    <tr key={generarKey(a)}>
                      <td>{a.nro || "-"}</td>
                      <td>{a.edad_estimada}</td>
                      <td>{a.fecha_ingreso}</td>
                      <td>{Object.entries(a.estado).find(([, v]) => v)?.[0].replace("_", " ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
