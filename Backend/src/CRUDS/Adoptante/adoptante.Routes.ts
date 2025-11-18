import { Router } from 'express';
import { AdoptanteModel } from '../../CRUDS/Persona/adoptanteModel.js'; // ajustá el path

export const ListaNegraRoutes = Router();

// ✅ GET: lista negra (solo los que tienen ListaNegra = true)
ListaNegraRoutes.get('/adoptantes/lista-negra', async (req, res) => {
    try {
        const adoptantesEnListaNegra = await AdoptanteModel.find({ ListaNegra: true });
        res.json(adoptantesEnListaNegra);
    } catch (error) {
        console.error('Error al obtener lista negra:', error);
        res.status(500).json({ message: 'Error al obtener la lista negra' });
    }
});

// ✅ PUT: cambiar valor de ListaNegra para un adoptante por _id
ListaNegraRoutes.put('/adoptantes/:id/lista-negra', async (req, res) => {
    try {
        const { id } = req.params;
        const { ListaNegra } = req.body; // 👈 importante que se llame igual que en el schema

        console.log('PUT /adoptantes/:id/lista-negra', { id, ListaNegra });

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
