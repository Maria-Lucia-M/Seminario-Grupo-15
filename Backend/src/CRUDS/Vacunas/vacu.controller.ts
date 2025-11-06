import { Request, Response } from 'express';
import { RegistrarVacuna } from './registrarVacuna.js';
import { VacunaRepositoryMongo } from './vacunaRepositoryMongo.js';

export const findAllVacunas = async (req: Request, res: Response): Promise<void> => {
    try{
        const Vacunas = await new VacunaRepositoryMongo().getAll();
        if(Vacunas.length === 0){
            res.status(200).json({ message: 'No hay Vacunas registradas', data: [] });
            return;
        };
        res.status(200).json(Vacunas);
        return;
    } catch (error) {
        console.error('Error al obtener Vacunas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const getOneVacuna = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.nro_vacuna, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de Vacuna inválido' });
            return;
        };
        const Vacuna =  await new VacunaRepositoryMongo().buscarPorNro(nro);
        if (!Vacuna) {
            res.status(404).json({ message: 'Vacuna no encontrada' });
            return;
        };

        res.status(200).json({ message: "Vacuna encontrada", data: Vacuna });
        return;
    }catch (error) {
        console.error('Error al obtener Vacuna:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const registrarVacunaController = async (req: Request, res: Response): Promise<void> => {
    try {
        const casoUso = new RegistrarVacuna(new VacunaRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);
        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        };

        res.status(201).json({ message: "Vacuna registrada con exito", data: resultado });
        return;
    } catch (error) {
        console.error('Error al registrar Vacuna:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const actualizarVacuna = async (req: Request, res: Response): Promise<void> => {
    try {
        const nro = parseInt(req.params.nro_vacuna, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de Vacuna inválido' });
            return;
        };

        const repo = new VacunaRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Vacuna no encontrada' });
            return;
        };

        const actualizado = await repo.actualizar(nro, req.body);
        res.status(200).json({ message: 'Vacuna actualizada con éxito', data: actualizado });
        return;
    } catch (error) {
        console.error('Error al actualizar Vacuna:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const eliminarVacuna = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.nro_vacuna, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de Vacuna inválido' });
            return;
        };
        const repo = new VacunaRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Vacuna no encontrada' });
            return;
        };

        await repo.eliminar(nro);
        res.status(200).json({ message: 'Vacuna eliminada con éxito' });
        return;
    } catch(error) {
        console.error('Error al eliminar Vacuna:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};