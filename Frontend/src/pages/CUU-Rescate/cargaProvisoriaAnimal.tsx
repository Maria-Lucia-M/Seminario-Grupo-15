import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../rutasGenericas";
import { useAnimal } from "../../animal/useAnimal";
import axios from "axios";
import './formulario.css';

type Especie = "Perro" | "Gato";
/*type Estado =
  | "Apto"
  | "No apto"
  | "En adopcion"
  | "Adoptado"
  | "disponible"
  | "no_disponible";

export interface AnimalDTO {
  nro: number;
  especie: Especie;
  raza: string;
  edad_estimada: number;
  fecha_ingreso: Date;
  fecha_defuncion: Date | null;
  estado: Estado;
  imagen: string | null;
  video: string | null;
}*/

export function CargaProvisoriaAnimal() {

  const { animal }= useAnimal();
  const navigate = useNavigate();

  const [especie, setEspecie] = useState<Especie>("Perro");
  const [raza, setRaza] = useState("");
  const [edad_estimada, setEdadEstimada] = useState<number | "">("");
  const [error, setError] = useState("");

  
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

  if (!animal) {
    setError("No hay datos del animal cargados. Volvé a Registrar Rescate.");
    return;
  }

    if (edad_estimada === "" || edad_estimada < 0 || edad_estimada > 30) {
      setError("La edad estimada debe estar entre 0 y 30 años");
      return;
    }
    if (!raza.trim()) {
      setError("La raza es obligatoria");
      return;
    }

    try {
      await axios.post(`${API_URL}/animales`, {
        nro: animal.nro,
        especie,
        raza,
        edad_estimada,
        fecha_ingreso: new Date(),
        fecha_defuncion: null,
        estado: "No apto",
        imagen: [],
        video: []
      });
      alert('Animal rescatado registrado con exito!');
      navigate("/trabajadores/homePage")
    } catch (error) {
      console.error('Error registrando animal rescatado:', error);
      alert('Error registrando animal rescatado...');
    }
  };

  return (
    <section className="formulario-page">
      <h2>Registro provisorio de animal rescatado</h2>
      <form className="formulario-form" onSubmit={enviarFormulario}>
        <div className="form-row">
          <label>Especie de animal</label>
          <select
            value={especie}
            onChange={(e) => setEspecie(e.target.value as Especie)}
            className="w-full border rounded-lg p-2"
          >
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>
        <div className="form-row">
          <label>Raza</label>
          <input value={raza} onChange={e => setRaza(e.target.value)} required/>
        </div>
        <div className="form-row">
          <label>Edad estimada</label>
          <input type="number" min={0} max={30}
            value={edad_estimada} onChange={e => setEdadEstimada(e.target.value === "" ? "" : Number(e.target.value))} required/>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="boton-registrar">Registrar animal rescatado</button>
        </div>
      </form>
    </section>
  );
}

/*
        <div className="form-row">
          <label>Estado</label>
          <select
            value={estado} onChange={e => setEstado(e.target.value as Estado)} required
          >
            <option value="Apto">Apto</option>
            <option value="No apto">No apto</option>
            <option value="En adopcion">En adopcion</option>
            <option value="Adoptado">Adoptado</option>
            <option value="disponible">Disponible</option>
            <option value="no_disponible">No disponible</option>
          </select>
        </div>
*/