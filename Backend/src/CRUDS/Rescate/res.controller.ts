import { Request, Response } from 'express';
import { RegistrarRescate } from './RegistrarRescate.js';
import { RescateRepositoryMongo } from './rescateRepositoryMongo.js';

export class RescateController {
    private registrarRescate: RegistrarRescate;
    constructor() {
        const repo = new RescateRepositoryMongo();
        this.registrarRescate = new RegistrarRescate(repo);
    }
    public async createRescate(req: Request, res: Response): Promise<void> {
        try {
            const resultado = await this.registrarRescate.ejecutar(req.body);
            if (Array.isArray(resultado)) {
                res.status(400).json({ errors: resultado });
            } else {
                res.status(201).json({ message: 'Rescate guardado correctamente!', rescate: resultado });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el rescate', error });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const rescates = await this.registrarRescate['repo'].obtenerRescates();
            res.status(200).json(rescates);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los rescates', error });
        }
    }
    public async getRescate(req: Request, res: Response): Promise<void> {
        try {
            const nro_animal = parseInt(req.params._id, 10);
            const rescate = await this.registrarRescate['repo'].obtenerRescatePorNroAnimal(nro_animal);
            if (rescate) {
                res.status(200).json(rescate);
            } else {
                res.status(404).json({ message: 'Rescate no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el rescate', error });
        }
    }

    public async updateRescate(req: Request, res: Response): Promise<void> {
        try {
            const nro_animal = parseInt(req.params._id, 10);
            const rescateActualizado = await this.registrarRescate['repo'].actualizarRescate(nro_animal, req.body);
            if (rescateActualizado) {
                res.status(200).json({ message: 'Rescate actualizado correctamente!', rescateActualizado });
            } else {
                res.status(404).json({ message: 'Rescate no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el rescate', error });
        }
    }

    public async deleteRescate(req: Request, res: Response): Promise<void> {
        try {
            const nro_animal = parseInt(req.params._id, 10);
            const eliminado = await this.registrarRescate['repo'].eliminarRescate(nro_animal);
            if (eliminado) {
                res.status(200).json({ message: 'Rescate eliminado correctamente!' });
            } else {
                res.status(404).json({ message: 'Rescate no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el rescate', error });
        }
    }
}