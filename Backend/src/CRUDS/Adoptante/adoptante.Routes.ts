import { Router } from 'express';
import { AdoptanteModel } from '../../CRUDS/Persona/adoptanteModel.js';

// Este router se monta en app.ts con: app.use('/api', ListaNegraRoutes);
export const ListaNegraRoutes = Router();

/**
 * GET /api/adoptantes
 * Devuelve todos los adoptantes (sin filtrar por lista negra)
 */
ListaNegraRoutes.get('/adoptantes', async (req, res) => {
    try {
        const adoptantes = await AdoptanteModel.find();
        res.json(adoptantes);
    } catch (error) {
        console.error('Error al obtener adoptantes:', error);
        res.status(500).json({ message: 'Error al obtener los adoptantes' });
    }
});

/**
 * GET /api/adoptantes/lista-negra
 * Devuelve solo los adoptantes que están marcados con ListaNegra = true
 */
ListaNegraRoutes.get('/adoptantes/lista-negra', async (req, res) => {
    try {
        const adoptantesEnListaNegra = await AdoptanteModel.find({ ListaNegra: true });
        res.json(adoptantesEnListaNegra);
    } catch (error) {
        console.error('Error al obtener lista negra:', error);
        res.status(500).json({ message: 'Error al obtener la lista negra' });
    }
});

ListaNegraRoutes.put('/adoptantes/:id/lista-negra', async (req, res) => {
    try {
        const { id } = req.params;
        const { ListaNegra } = req.body;

        if (typeof ListaNegra !== 'boolean') {
            return res.status(400).json({ message: 'ListaNegra debe ser boolean (true/false)' });
        }

        const actualizado = await AdoptanteModel.findByIdAndUpdate(
            id,
            { ListaNegra },
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ message: 'Adoptante no encontrado' });
        }

        res.json(actualizado);
    } catch (error) {
        console.error('Error al actualizar ListaNegra:', error);
        res.status(500).json({ message: 'Error al actualizar ListaNegra' });
    }
});
