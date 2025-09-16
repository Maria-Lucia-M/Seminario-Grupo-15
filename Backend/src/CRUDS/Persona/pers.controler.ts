import { Request, Response } from 'express';
import { Persona } from './per.entity';

export class PersonaController {
    private personas: Persona[] = [];

    public createPersona(req: Request, res: Response): void {
        const { dni, nombre, apellido, mail, contraseña, telefono, veterinario, adoptante, colaborador } = req.body;
        const newPersona = new Persona(dni, nombre, apellido, mail, contraseña, telefono, veterinario || null, adoptante || null, colaborador || null);
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
            const personaAActualizar = this.personas[index];
            const datosNuevos = req.body;

            personaAActualizar.nombre = datosNuevos.nombre || personaAActualizar.nombre;
            personaAActualizar.apellido = datosNuevos.apellido || personaAActualizar.apellido;
            personaAActualizar.mail = datosNuevos.mail || personaAActualizar.mail;
            personaAActualizar.contraseña = datosNuevos.contraseña || personaAActualizar.contraseña;
            personaAActualizar.telefono = datosNuevos.telefono || personaAActualizar.telefono;

            if (datosNuevos.veterinario !== undefined) {
                personaAActualizar.veterinario = datosNuevos.veterinario;
            }
            if (datosNuevos.adoptante !== undefined) {
                personaAActualizar.adoptante = datosNuevos.adoptante;
            }
            if (datosNuevos.colaborador !== undefined) {
                personaAActualizar.colaborador = datosNuevos.colaborador;
            }
            
            this.personas[index] = personaAActualizar;
            
            res.status(200).json(personaAActualizar);
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