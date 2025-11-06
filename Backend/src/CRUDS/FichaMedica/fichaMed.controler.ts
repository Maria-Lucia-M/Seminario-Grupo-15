import { Request, Response } from 'express';
import { RegistrarFichaMedica } from './registrarFichaMed.js';
import { FichaMedicaRepositoryMongo } from './fichaMedRepositoryMongo.js';

export const findAllFichas = async (req: Request, res: Response): Promise<void> => {
    try{
        const Fichas = await new FichaMedicaRepositoryMongo().getAll();
        if(Fichas.length === 0){
            res.status(200).json({ message: 'No hay Fichas Medicas registradas', data: [] });
            return;
        };
        res.status(200).json(Fichas);
        return;
    } catch (error) {
        console.error('Error al obtener Fichas Medicas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const getOneFichaMedica = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.nro_ficha, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de Ficha Medica inválido' });
            return;
        };
        const FichaMedica =  await new FichaMedicaRepositoryMongo().buscarPorNro(nro);
        if (!FichaMedica) {
            res.status(404).json({ message: 'Ficha Medica no encontrada' });
            return;
        };

        res.status(200).json({ message: "Ficha Medica encontrada", data: FichaMedica });
        return;
    }catch (error) {
        console.error('Error al obtener Ficha Medica:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const registrarFichaMedicaController = async (req: Request, res: Response): Promise<void> => {
    try {
        const casoUso = new RegistrarFichaMedica(new FichaMedicaRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);

        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        };

        res.status(201).json({ message: "Ficha Medica registrada con exito", data: resultado });
        return;
    } catch (error) {
        console.error('Error al registrar Ficha Medica:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const actualizarFichaMedica = async (req: Request, res: Response): Promise<void> => {
    try {
        const nro = parseInt(req.params.nro_ficha, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de Ficha Medica inválido' });
            return;
        };
        const repo = new FichaMedicaRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Ficha Medica no encontrada' });
            return;
        };

        const actualizado = await repo.actualizar(nro, req.body);
        if(actualizado === null){
            res.status(404).json({ message: 'No se pudo actualizar la Ficha Medica' });
            return;
        };
        res.status(200).json({ message: 'Ficha Medica actualizada con éxito', data: actualizado });
        return;
    }catch(error) {
        console.error('Error al actualizar Ficha Medica:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const eliminarFichaMedica = async (req: Request, res: Response): Promise<void> => {
    try{
        const nro = parseInt(req.params.nro_ficha, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de Ficha Medica inválido' });
            return;
        };
        const repo = new FichaMedicaRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Ficha Medica no encontrada' });
            return;
        };

        const eliminado = await repo.eliminar(nro);
        if (!eliminado) {
            res.status(404).json({ message: 'No se pudo eliminar la Ficha Medica' });
            return;
        };
        res.status(200).json({ message: 'Ficha Medica eliminada con éxito' });
        return;
    }catch(error) {
        console.error('Error al eliminar Ficha Medica:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};