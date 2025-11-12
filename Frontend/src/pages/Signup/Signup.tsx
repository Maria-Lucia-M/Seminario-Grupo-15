import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.ts';
import { API_URL } from '../../rutasGenericas.ts'; 
import "./signup.css";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { getRutaInicioPorRol } from '../../components/GetRutaInicioPorRol.ts';
export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        telefono: '',
        password: '',
        domicilio: '',
        estado: 'Apto'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Validar nombre
        if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';

        // Validar apellido
        if (!formData.apellido) newErrors.apellido = 'El apellido es obligatorio';

        // Validar DNI
        if (!formData.dni) newErrors.dni = 'El DNI es obligatorio';
        else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';

        // Validar email
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email no válido';

        // Validar teléfono
        if(!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio';
        else if (!/^\d{10,15}$/.test(formData.telefono)) newErrors.telefono = 'Teléfono no válido';

        // Validar dirección
        if (!formData.domicilio) newErrors.domicilio = 'La dirección es obligatoria';

        // Validar contraseña
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!validateForm()) {
            console.warn("Errores de validación:", errors);
            return;
        };

        setIsSubmitting(true);

        try{
            const response = await axios.post(`${API_URL}/personas/signup`, formData, {
                validateStatus: (status) => status < 400 // Acepta códigos 200 y 201 como éxitos
            });
            
            if (response.status === 201) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Bienvenido!",
                    text: "Adoptante creado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                //console.log("Respuesta completa del backend:", response.data);
                //console.log("accessToken recibido:", response.data?.accessToken);
                //console.log("userData recibido:", response.data?.data);

                const userData = response.data?.data; 
                const accessToken = response.data?.accessToken; 
                const refreshToken = response.data?.refreshToken;

                if (!accessToken || !userData) {
                    console.error("Error: El backend envió un accessToken o userData vacío.");
                    return;
                };

                const userDataNormalizado = {
                    ...userData,
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                    codigo: userData.codigo
                };

                auth.login(accessToken, refreshToken, userDataNormalizado);

                // Redirigir al login o hacer login automático
                if (auth.isAuthenticated) {
                    //console.log("Estado de autenticación después del signup:", auth.isAuthenticated);
                    const destino = getRutaInicioPorRol(auth.user?.rol || '');
                    navigate(destino, {replace: true});
                };
            }
        } catch(error: any){
            console.error("Error al crear usuario:", error.response?.data || error.message);
            
            const errores = error.response?.data?.errores;
            const mensaje = error.response?.data?.message;

            if (Array.isArray(errores)) {
                Swal.fire({
                    icon: "error",
                    title: "Errores de validación",
                    html: `<ul style="text-align:left;">${errores.map((err: string) => `<li>${err}</li>`).join('')}</ul>`,
                    confirmButtonText: "Aceptar",
                    position: "center"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: mensaje || "Ha ocurrido un problema en el alta.",
                    confirmButtonText: "Aceptar",
                    position: "center"
                });
            }
        } finally {
            setIsSubmitting(false);
        };
    };

    const auth = useAuth();
    
    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log(`Usuario ya autenticado ${auth.user}, redirigiendo...`);
            const destino = getRutaInicioPorRol(auth.user?.rol || '');
            navigate(destino, {replace: true});
        };
    },[auth.isAuthenticated, auth.user, navigate]);

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-body p-4">
                    <h2 className="text-center mb-4">Registro de Usuario</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Nombre */}
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder='Ingrese su nombre'
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>

                        {/* Apellido */}
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input
                                type="text"
                                className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder='Ingrese su apellido'
                            />
                            {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                        </div>

                        {/* DNI */}
                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input
                                type="text"
                                className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
                                id="dni"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                placeholder='Ingrese su DNI sin puntos ni comas'
                            />
                            {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Ingrese su email'
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        {/* Teléfono */}
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                            <input
                                type="text"
                                className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder='Ingrese su teléfono'
                            />
                            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                        </div>

                        {/* Dirección */}
                        <div className="mb-3">
                            <label htmlFor="domicilio" className="form-label">Dirección</label>
                            <input
                                type="text"
                                className={`form-control ${errors.domicilio ? 'is-invalid' : ''}`}
                                id="domicilio"
                                name="domicilio"
                                value={formData.domicilio}
                                onChange={handleChange}
                                placeholder='Ingrese su dirección'
                            />
                            {errors.domicilio && <div className="invalid-feedback">{errors.domicilio}</div>}
                        </div>

                        {/* Contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Ingrese su contraseña'
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Registrando...
                                </>
                            ) : 'Registrarse'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};