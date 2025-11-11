import { Request, Response } from 'express';
import { RegistrarRescatista } from './registrarRescatista.js';
import { RescatistaRepositoryMongo } from './rescatistaRepositoryMongo.js';

export const findAllRescatista = async (req: Request, res: Response): Promise<void> => {
    try{
        const rescatistas = await new RescatistaRepositoryMongo().getAll();
        if(rescatistas.length === 0){
            res.status(200).json({ message: 'No hay rescatistas registrados', data: [] });
            return;
        };
        res.status(200).json(rescatistas);
        return;
    } catch (error) {
        console.error('Error al obtener rescatistas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const getOneRescatista = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.dni, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'DNI de rescatista inválido' });
            return;
        };
        const rescatista =  await new RescatistaRepositoryMongo().buscarPorNro(nro);
        if (!rescatista) {
            res.status(404).json({ message: 'Rescatista no encontrado' });
            return;
        };

        res.status(200).json({ message: "Rescatista encontrado", data: rescatista });
        return;
    }catch (error) {
        console.error('Error al obtener rescatista:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const registrarRescatistaController = async (req: Request, res: Response): Promise<void> => {
    try {
        const casoUso = new RegistrarRescatista(new RescatistaRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);

        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        };

        res.status(201).json({ message: "Rescatista registrado con exito", data: resultado });
        return;
    } catch (error) {
        console.error('Error al registrar rescatista:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const actualizarRescatista = async (req: Request, res: Response): Promise<void> => {
    try {
        const nro = parseInt(req.params.dni, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de rescatista inválido' });
            return;
        };
        const repo = new RescatistaRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Rescatista no encontrado' });
            return;
        };

        const actualizado = await repo.update(nro, req.body);
        if(actualizado === null){
            res.status(404).json({ message: 'No se pudo actualizar el rescatista' });
            return;
        };
        res.status(200).json({ message: 'Rescatista actualizado con éxito', data: actualizado });
        return;
    }catch(error) {
        console.error('Error al actualizar rescatista:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const eliminarRescatista = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.dni, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de rescatista inválido' });
            return;
        };
        const repo = new RescatistaRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Rescatista no encontrado' });
            return;
        };

        const eliminado = await repo.delete(nro);
        if (!eliminado) {
            res.status(404).json({ message: 'No se pudo eliminar el rescatista' });
            return;
        };
        res.status(200).json({ message: 'Rescatista eliminado con éxito' });
        return;
    }catch(error) {
        console.error('Error al eliminar rescatista:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};