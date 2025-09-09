import { Request, Response } from 'express';
import { Persona } from './per.entity';

export class PersonaController {
    private personas: Persona[] = [];

    public createPersona(req: Request, res: Response): void {
        const { dni, nombre, apellido, mail, contraseña, telefono } = req.body;
        const newPersona = new Persona(dni, nombre, apellido, mail, contraseña, telefono);
        this.personas.push(newPersona);
        res.status(201).json(newPersona);
    }

    public getPersona(req: Request, res: Response): void {
        const { dni } = req.params;
        const persona = this.personas.find(p => p.dni === dni);
        if (persona) {
            res.status(200).json(persona);
        } else {
            res.status(404).json({ message: 'Persona not found' });
        }
    }

    public updatePersona(req: Request, res: Response): void {
        const { dni } = req.params;
        const index = this.personas.findIndex(p => p.dni === dni);
        if (index !== -1) {
            const { nombre, apellido, mail, contraseña, telefono } = req.body;
            this.personas[index] = { dni, nombre, apellido, mail, contraseña, telefono };
            res.status(200).json(this.personas[index]);
        } else {
            res.status(404).json({ message: 'Persona not found' });
        }
    }

    public deletePersona(req: Request, res: Response): void {
        const { dni } = req.params;
        const index = this.personas.findIndex(p => p.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Persona not found' });
        }
    }
}