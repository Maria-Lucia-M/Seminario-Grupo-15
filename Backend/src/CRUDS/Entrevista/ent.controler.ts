import { Request, Response } from 'express';
import { EntrevistaRepositoryMongo } from './entrevistaRepositoryMongo.js';

const repo = new EntrevistaRepositoryMongo();

export class EntrevistaController {

    public async findAllEntrevistas(req: Request, res: Response): Promise<void> {
        try {
            const entrevistas = await repo.getAll();
            if (entrevistas.length === 0) {
                res.status(200).json({ message: 'No hay entrevistas registradas', data: [] });
                return;
            }
            res.status(200).json(entrevistas);
        } catch (error: any) {
            console.error('Error al obtener entrevistas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public async getEntrevista(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const entrevista = await repo.buscarPorId(id);
            if (entrevista) {
                res.status(200).json(entrevista);
            } else {
                res.status(404).json({ message: 'Entrevista no encontrada' });
            }
        } catch (error: any) {
            console.error('Error al obtener entrevista:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public async createEntrevista(req: Request, res: Response): Promise<void> {
        try {
            const nuevaEntrevista = await repo.registrar(req.body);
            res.status(201).json(nuevaEntrevista);
        } catch (error: any) {
            console.error('Error al registrar entrevista:', error);
            res.status(400).json({ message: error.message || 'Error al registrar' });
        }
    }
}