import { useState } from "react";
import { api } from "../../services/api.ts";
import './ingresoRescatista.css';

export function IngresoRescatista() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/rescatistas', {
        dni,
        nombre,
        apellido,
        telefono
      });
      alert('Rescatista registrado con exito!');
      //Limpiar formulario al registrarse correctamente
      setDni("");
      setNombre("");
      setApellido("");
      setTelefono("");
    } catch (error) {
      console.error('Error registrando rescatista:', error);
      alert('Error registrando rescatista...');
    }
  };

  return (
    <section className="ingreso-rescatista-page">
      <h2>Registro de Rescatista</h2>
      <form className="ingreso-rescatista-form" onSubmit={enviarFormulario}>
        <div className="form-row">
          <label>DNI</label>
          <input value={dni} onChange={e => setDni(e.target.value)} required/>
        </div>
        <div className="form-row">
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} required/>
        </div>
        <div className="form-row">
          <label>Apellido</label>
          <input value={apellido} onChange={e => setApellido(e.target.value)} required/>
        </div>
        <div className="form-row">
          <label>Teléfono</label>
          <input value={telefono} onChange={e => setTelefono(e.target.value)} required/>
        </div>
        <button type="submit">Registrar Rescatista</button>
      </form>
    </section>
  );
}