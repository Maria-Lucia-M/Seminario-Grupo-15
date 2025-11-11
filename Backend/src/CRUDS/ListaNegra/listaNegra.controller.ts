import { Request, Response } from 'express';
import listaNegraService from '../../shared/listaNegraService.js';
import adoptanteService from '../../shared/personaService.js';

export class ListaNegraController {
    public agregarAListaNegra(req: Request, res: Response): void {
        const { dni_adoptante, motivo } = req.body;
        
        if (!dni_adoptante || !motivo) {
            res.status(400).json({ message: 'DNI del adoptante y motivo son requeridos' });
            return;
        }

        // Verificar que el adoptante existe (solo se almacenan adoptantes en el servicio)
        const adoptante = adoptanteService.obtenerAdoptante(dni_adoptante);
        if (!adoptante) {
            res.status(404).json({ 
                message: 'El adoptante no está registrado en el sistema' 
            });
            return;
        }

        // Verificar si ya está en la lista negra
        if (listaNegraService.yaExiste(dni_adoptante)) {
            res.status(409).json({ message: 'El adoptante ya está en la lista negra' });
            return;
        }

        const nuevoBloqueo = listaNegraService.agregar(adoptante, motivo);
        res.status(201).json(nuevoBloqueo);
    }

    public quitarDeListaNegra(req: Request, res: Response): void {
        const { dni_adoptante } = req.params;
        const removido = listaNegraService.quitar(dni_adoptante);

        if (removido) {
            res.status(200).json({ message: 'Adoptante removido de la lista negra' });
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado en la lista negra' });
        }
    }

    public verificarEnListaNegra(req: Request, res: Response): void {
        const { dni_adoptante } = req.params;
        const item = listaNegraService.estaEnListaNegra(dni_adoptante);

        if (item) {
            res.status(200).json({ enListaNegra: true, item });
        } else {
            res.status(200).json({ enListaNegra: false });
        }
    }

    public obtenerListaNegra(req: Request, res: Response): void {
        const listaActiva = listaNegraService.obtenerTodos();
        res.status(200).json(listaActiva);
    }

    public obtenerPorDni(req: Request, res: Response): void {
        const { dni_adoptante } = req.params;
        const items = listaNegraService.obtenerPorDni(dni_adoptante);

        if (items.length > 0) {
            res.status(200).json(items);
        } else {
            res.status(404).json({ message: 'No se encontraron registros para este adoptante' });
        }
    }
}

