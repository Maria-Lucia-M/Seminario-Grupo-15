import { useRescatista } from "../../rescatista/useRescatista";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../rutasGenericas";
import axios from "axios";
import './formulario.css';

export function RegistrarRescate () {

  const navigate = useNavigate();
  const { rescatista } = useRescatista();

  const [lugar_rescate, setLugarRescate] = useState("");
  const [nro_animal, setNroAnimal] = useState<number | null>(null);

  // 🔥 1. Obtener último nro_animal al cargar el componente
useEffect(() => {
  const obtenerUltimoNumero = async () => {
    try {
      const res = await axios.get(`${API_URL}/animales`);

      const animales = res.data;

      if (animales.length === 0) {
        setNroAnimal(1); // primer animal
        return;
      }

      // obtener el mayor nro_animal
      const mayor = Math.max(...animales.map((a: any) => a.nro_animal));

      setNroAnimal(mayor + 1);

    } catch (error) {
      console.error("Error obteniendo animales:", error);
    }
  };

  obtenerUltimoNumero();
}, []);


  const handleFinalizarRescate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rescatista || nro_animal === null) return;

    try {
      await axios.post(`${API_URL}/rescatistas`, {
        lugar_rescate,
        fecha_rescate: new Date().toISOString(),
        nro_animal,
        dni_rescatista: rescatista.dni
      });

      alert("Rescate registrado con éxito!");
      navigate("/cuu/CargaProvisoriaAnimal");
    } catch (error) {
      console.error("Error registrando rescate:", error);
      alert("Error registrando rescate...");
    }
  };

  return (
    <section className="formulario-page">
      <h2>Registro de Rescate</h2>
      <form className="formulario-form" onSubmit={handleFinalizarRescate}>
        <div className="form-row">
          <label>Ingrese lugar de rescate</label>
          <input value={lugar_rescate} onChange={(e) => setLugarRescate(e.target.value)}/>
        </div>
        <div className="form-row">
          <label>Número de animal autoasignado</label>
          <input value={nro_animal ?? "cargando..."} disabled />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={nro_animal === null} className="boton-registrar">Siguiente</button>
        </div>
      </form>
    </section>
  );
}