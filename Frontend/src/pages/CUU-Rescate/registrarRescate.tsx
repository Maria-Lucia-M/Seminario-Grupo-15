import { useRescatista } from "../../rescatista/useRescatista";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimal } from "../../animal/useAnimal";
import { API_URL } from "../../rutasGenericas";
import axios from "axios";
import './formulario.css';

export function RegistrarRescate () {

  const navigate = useNavigate();
  const { rescatista } = useRescatista();
  const [lugar_rescate, setLugarRescate] = useState("");
  const [nro_animal, setNroAnimal] = useState<number | null>(null);
  const {setAnimal}=useAnimal();

  // Obtener último nro_animal al cargar el componente
useEffect(() => {
  const obtenerUltimoNumero = async () => {
    try {
      const res = await axios.get(`${API_URL}/animales`);
      const posibles = res.data?.data ?? res.data;
      const animales = Array.isArray(posibles) ? posibles : [];

      if (animales.length === 0) {
        setNroAnimal(1);
        return;
      }

      const mayor = Math.max(...animales.map(a => a.nro));

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

      await axios.post(`${API_URL}/rescates`, {
        lugar_rescate,
        fecha_rescate: new Date(),
        nro_animal,
        dni_rescatista: rescatista.dni
      });

      setAnimal({
      nro: nro_animal,
      especie: "",              // se completará en la siguiente página
      raza: "",
      edad_estimada: 0,
      fecha_ingreso: new Date(),
      fecha_defuncion: null,
      estado: "No apto",
      imagen: [],
      video: []
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