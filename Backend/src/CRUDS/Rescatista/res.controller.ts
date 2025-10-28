import { Request, Response } from 'express';
import { RegistrarRescatista } from './RegistrarRescatista';
import { RescatistaRepositoryMongo } from './rescatistaRepositoryMongo';

export class RescatistaController {
    private registrarRescatista: RegistrarRescatista;
    constructor() {
        const repo = new RescatistaRepositoryMongo();
        this.registrarRescatista = new RegistrarRescatista(repo);
    }
    public async createRescatista(req: Request, res: Response): Promise<void> {
        try {
            const resultado = await this.registrarRescatista.ejecutar(req.body);
            if (Array.isArray(resultado)) {
                res.status(400).json({ errors: resultado });
            } else {
                res.status(201).json({ message: 'Rescatista guardado correctamente!', rescatista: resultado });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el rescatista', error });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const rescatistas = await this.registrarRescatista['repo'].getAll();
            res.status(200).json(rescatistas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los rescatistas', error });
        }
    }
    public async getRescatista(req: Request, res: Response): Promise<void> {
        try {
            const dni = req.params._id;
            const rescatista = await this.registrarRescatista['repo'].getById(dni);
            if (rescatista) {
                res.status(200).json(rescatista);
            } else {
                res.status(404).json({ message: 'Rescatista no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el rescatista', error });
        }
    }

    public async updateRescatista(req: Request, res: Response): Promise<void> {
        try {
            const dni = req.params._id;
            const rescatistaActualizado = await this.registrarRescatista['repo'].update(dni, req.body);
            if (rescatistaActualizado) {
                res.status(200).json({ message: 'Rescatista actualizado correctamente!', rescatistaActualizado });
            } else {
                res.status(404).json({ message: 'Rescatista no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el rescatista', error });
        }
    }

    public async deleteRescatista(req: Request, res: Response): Promise<void> {
        try {
            const dni = req.params._id;
            const eliminado = await this.registrarRescatista['repo'].delete(dni);
            if (eliminado) {
                res.status(200).json({ message: 'Rescatista eliminado correctamente!' });
            } else {
                res.status(404).json({ message: 'Rescatista no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el rescatista', error });
        }
    }
}