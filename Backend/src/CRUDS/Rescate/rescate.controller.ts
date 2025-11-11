import { Request, Response } from 'express';
import { RegistrarRescate } from './registrarRescate.js';
import { RescateRepositoryMongo } from "./rescateRepositoryMongo.js";

export const findAllRescates = async (req: Request, res: Response): Promise<void> => {
    try{
        const rescates = await new RescateRepositoryMongo().obtenerRescates();
        if(rescates.length === 0){
            res.status(200).json({ message: 'No hay rescates registrados', data: [] });
            return;
        };
        res.status(200).json(rescates);
        return;
    } catch (error) {
        console.error('Error al obtener rescates:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const getOneRescate = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.nro, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de animal inválido' });
            return;
        };
        const rescate =  await new RescateRepositoryMongo().obtenerRescatePorNroAnimal(nro);
        if (!rescate) {
            res.status(404).json({ message: 'Rescate no encontrado' });
            return;
        };

        res.status(200).json({ message: "Rescate encontrado", data: rescate });
        return;
    }catch (error) {
        console.error('Error al obtener rescate:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const registrarRescateController = async (req: Request, res: Response): Promise<void> => {
    try {
        const casoUso = new RegistrarRescate(new RescateRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);

        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        };

        res.status(201).json({ message: "Rescate registrado con exito", data: resultado });
        return;
    } catch (error) {
        console.error('Error al registrar rescate:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const actualizarRescate = async (req: Request, res: Response): Promise<void> => {
    try {
        const nro = parseInt(req.params.nro, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de rescate inválido' });
            return;
        };
        const repo = new RescateRepositoryMongo();
        const existente = await repo.obtenerRescatePorNroAnimal(nro);
        if (!existente) {
            res.status(404).json({ message: 'Rescate no encontrado' });
            return;
        };

        const actualizado = await repo.actualizarRescate(nro, req.body);
        if(actualizado === null){
            res.status(404).json({ message: 'No se pudo actualizar el rescate' });
            return;
        };
        res.status(200).json({ message: 'Rescate actualizado con éxito', data: actualizado });
        return;
    }catch(error) {
        console.error('Error al actualizar rescate:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const eliminarRescate = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.nro, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de animal inválido' });
            return;
        };
        const repo = new RescateRepositoryMongo();
        const existente = await repo.obtenerRescatePorNroAnimal(nro);
        if (!existente) {
            res.status(404).json({ message: 'Rescate no encontrado' });
            return;
        };

        const eliminado = await repo.eliminarRescate(nro);
        if (!eliminado) {
            res.status(404).json({ message: 'No se pudo eliminar el rescate' });
            return;
        };
        res.status(200).json({ message: 'Rescate eliminado con éxito' });
        return;
    }catch(error) {
        console.error('Error al eliminar rescate:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};