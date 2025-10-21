import { useState } from "react";
import { api } from "../../services/api.ts";
import './validaRescatista.css';

export function ValidaRescatista() {
  const [dni, setDni] = useState("");
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await api.get(`/rescatistas/dni/${dni}`);
      if (respuesta.data.exists) {
        alert('Rescatista validado con exito!');
      } else {
        alert('DNI de rescatista no encontrado.');
        //redirigir al ingreso de rescatista
        window.location.href = '/ingreso-rescatista';
      }
    } catch (error) {
      console.error('Error validando rescatista:', error);
      alert('Error validando rescatista...');
    }
  };

  return (
    <section className="valida-rescatista-page">
      <h2>Validación de Rescatista</h2>
      <form className="valida-rescatista-form" onSubmit={enviarFormulario}>
        <div className="form-row">
          <label>DNI</label>
          <input value={dni} onChange={e => setDni(e.target.value)} required/>
        </div>
        <button type="submit">Validar Rescatista</button>
      </form>
    </section>
  );
}