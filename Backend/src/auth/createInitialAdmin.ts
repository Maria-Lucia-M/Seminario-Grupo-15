import bcrypt from 'bcrypt';
import { PersonaModel } from '../CRUDS/Persona/personaModel.js';

export const createInitialAdmin = async () => {
    try {
        const adminExistente = await PersonaModel.findOne({ __t: "Admin" });

        if (adminExistente) {
            console.log("✔ Admin ya existente:", adminExistente.email);
            return;
        }

        const hashed = await bcrypt.hash("admin123", 10);

        const admin = await PersonaModel.create({
            __t: "Admin",
            nombre: "Admin",
            apellido: "General",
            dni: 99999999,
            email: "admin@sistemarefugio.com",
            password: hashed
        });

        console.log("🔥 Admin inicial creado:", admin.email);

    } catch (error) {
        console.error("Error creando admin inicial:", error);
    }
};
