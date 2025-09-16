import { Persona } from './per.entity';
export class PersonaController {
    constructor() {
        this.personas = [];
    }
    createPersona(req, res) {
        const { dni, nombre, apellido, mail, contraseña, telefono } = req.body;
        const newPersona = new Persona(dni, nombre, apellido, mail, contraseña, telefono);
        this.personas.push(newPersona);
        res.status(201).json(newPersona);
    }
    getPersona(req, res) {
        const { dni } = req.params;
        const persona = this.personas.find(p => p.dni === dni);
        if (persona) {
            res.status(200).json(persona);
        }
        else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    }
    updatePersona(req, res) {
        const { dni } = req.params;
        const index = this.personas.findIndex(p => p.dni === dni);
        if (index !== -1) {
            const { nombre, apellido, mail, contraseña, telefono } = req.body;
            this.personas[index] = { dni, nombre, apellido, mail, contraseña, telefono };
            res.status(200).json(this.personas[index]);
        }
        else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    }
    deletePersona(req, res) {
        const { dni } = req.params;
        const index = this.personas.findIndex(p => p.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    }
}
//# sourceMappingURL=pers.controler.js.map