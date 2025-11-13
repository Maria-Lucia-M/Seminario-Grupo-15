import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../rutasGenericas";
import axios from "axios";
import './formulario.css';
import "bootstrap/dist/css/bootstrap.min.css";

export function ValidaRescatista() {
  const [dni, setDni] = useState<number | "">("");
  const navigate = useNavigate();
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await axios.get(`${API_URL}/rescatistas/${dni}`);
      if (respuesta.data.exists) {
        alert('Rescatista validado con exito!');
        navigate("/cuu/rescate")
      } else {
        alert('DNI de rescatista no encontrado.');
      }
    } catch (error) {
      console.error('Error validando rescatista:', error);
      alert('Error validando rescatista...');
    }
  };

  return (
    <section className="formulario-page">
      <h2>Validación de Rescatista</h2>
      <form className="formulario-form" onSubmit={enviarFormulario}>
        <div className="form-row">
          <label>DNI</label>
          <input type="number" value={dni} onChange={e => setDni(e.target.value === "" ? "" : Number(e.target.value))} required/>
        </div>
        <div className="mt-3 text-center">
          <p className="text-muted">
            ¿El rescatista no está registrado?{' '}
            <a href="/cuu/ingreso-rescatista" className="text-decoration-none">Registrar rescatista</a>
          </p>
          <button type="submit" className="boton-registrar">Validar Rescatista</button>
        </div>
      </form>
    </section>
  );
}