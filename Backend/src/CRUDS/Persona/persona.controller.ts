import { Request, Response } from 'express';
import { PersonaRepositoryMongo } from './PersonaRepositoryMongo.js';
import { ListarPersonas } from './metodos/ListarPersona.js';
import { BuscarPersona } from './metodos/BuscarPersona.js';
import { RegistrarPersona } from './metodos/RegistrarPersona.js';
import { ActualizarPersona } from './metodos/ActualizarPersona.js';
import { EliminarPersona } from './metodos/EliminarPersona.js';
import { TokenService } from '../../application/tokenService.js';
import { SignUp } from './metodos/Signup.js';
import { AdoptanteModel } from './adoptanteModel.js';
import { ColaboradorModel } from './colaboradorModel.js';

const repo = new PersonaRepositoryMongo();

export const findAllPersona = async (req: Request, res: Response):Promise<void> => {
    try{
        const casoUso = new ListarPersonas(repo);
        const personas = await casoUso.ejecutar();
        if (personas.length === 0){
            res.status(200).json({ message: 'No se encontraron personas' });
            return;
        };
        
        res.status(200).json({ message: "Personas encontradas", data:personas});
        return;
    }catch(error){
        console.error({message: "Error al buscar todas las personas", error});
        res.status(500).json({message: 'Error interno del servidor'});
        return;
    };
};

export const getOnePersona = async (req: Request, res: Response): Promise<void> => {
    try {
        const dni = Number(req.params.dni);
        const casoUso = new BuscarPersona(repo);
        const persona = await casoUso.ejecutar(dni);
        if (!persona) {
            res.status(404).json({ message: 'Persona no encontrada' });
            return;
        };
        res.status(200).json({message: "Persona encontrada", data:persona});
        return;
    } catch (error) {
        console.error('Error al obtener persona:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const addPersona = async (req: Request, res: Response): Promise<void> => {
    try {
        const casoUso = new RegistrarPersona(repo);
        const resultado = await casoUso.ejecutar(req.body);
        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        };
        res.status(201).json({ message: 'Persona registrada con éxito', data: resultado });
        return;
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const updatePersona = async (req: Request, res: Response): Promise<void> => {
    try {
        const dni = Number(req.params.dni);
        const casoUso = new ActualizarPersona(repo);
        const resultado = await casoUso.ejecutar(dni, req.body);
        if (!resultado) {
            res.status(404).json({ message: 'Persona no encontrada o no actualizada' });
            return;
        };
        res.status(200).json({ message: 'Persona actualizada con éxito', data: resultado });
        return;
    } catch (error) {
        console.error('Error al actualizar persona:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const removePersona = async (req: Request, res: Response): Promise<void> => {
    try {
        const dni = Number(req.params.dni);
        const casoUso = new EliminarPersona(repo);
        const eliminado = await casoUso.ejecutar(dni);
        if (!eliminado) {
            res.status(404).json({ message: 'Persona no encontrada o no eliminada' });
            return;
        };
        res.status(200).json({ message: 'Persona eliminada con éxito' });
        return;
    } catch (error) {
        console.error('Error al eliminar persona:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const signupPersona = async (req: Request, res: Response): Promise<void> => {
    try{
        const repo = new PersonaRepositoryMongo();
        const casoUso = new SignUp(repo);

        const resultado = await casoUso.ejecutar(req.body);

        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        };

        const { accessToken, refreshToken } = TokenService.generarTokens(resultado);

        res.status(201).json({
            message: "Usuario dado de alta!",
            accessToken,
            refreshToken,
            data: { ...resultado, password: undefined },
        });
    }catch(error){
        console.error('Error al registrar un adoptante en el signup:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    };
};

export const findAdoptantesAptos = async (req: Request, res: Response): Promise<void> => {
    try {
        const adoptantes = await AdoptanteModel.find({ estado: 'Apto' }); 

            res.status(200).json(adoptantes.map(a => a.toObject()));
        } catch (error) {
            console.error('Error al buscar adoptantes aptos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    export const findColaboradores = async (req: Request, res: Response): Promise<void> => {
        try {
            const colaboradores = await ColaboradorModel.find(); 

            res.status(200).json(colaboradores.map(c => c.toObject()));
        } catch (error) {
            console.error('Error al buscar colaboradores:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

// Funciones para gestión de lista negra
export const findAdoptantesListaNegra = async (req: Request, res: Response): Promise<void> => {
    try {
        const adoptantesListaNegra = await AdoptanteModel.find({ enListaNegra: true });
        res.status(200).json(adoptantesListaNegra.map(a => a.toObject()));
    } catch (error) {
        console.error('Error al buscar adoptantes en lista negra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const agregarAListaNegra = async (req: Request, res: Response): Promise<void> => {
    try {
        const dni = Number(req.params.dni);
        const adoptante = await AdoptanteModel.findOneAndUpdate(
            { dni: dni },
            { enListaNegra: true },
            { new: true }
        );

        if (!adoptante) {
            res.status(404).json({ message: 'Adoptante no encontrado' });
            return;
        }

        res.status(200).json({ 
            message: 'Adoptante agregado a lista negra', 
            data: adoptante.toObject() 
        });
    } catch (error) {
        console.error('Error al agregar adoptante a lista negra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const quitarDeListaNegra = async (req: Request, res: Response): Promise<void> => {
    try {
        const dni = Number(req.params.dni);
        const adoptante = await AdoptanteModel.findOneAndUpdate(
            { dni: dni },
            { enListaNegra: false },
            { new: true }
        );

        if (!adoptante) {
            res.status(404).json({ message: 'Adoptante no encontrado' });
            return;
        }

        res.status(200).json({ 
            message: 'Adoptante removido de lista negra', 
            data: adoptante.toObject() 
        });
    } catch (error) {
        console.error('Error al quitar adoptante de lista negra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const findTodosAdoptantes = async (req: Request, res: Response): Promise<void> => {
    try {
        const adoptantes = await AdoptanteModel.find();
        res.status(200).json(adoptantes.map(a => a.toObject()));
    } catch (error) {
        console.error('Error al buscar todos los adoptantes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
    