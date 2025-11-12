import { Request, Response } from 'express';
import { AltaEntrevista } from './AltaEntrevista.js';
import { EntrevistaDTO } from '../../DTOs/EntrevistaDTO.js';

import { AnimalRepository } from '../../interfaces/AnimalRepository.js';
import { PersonaRepository } from '../../interfaces/PersonaRepository.js'; //crear esta interfaz
import { EntrevistaRepository } from '../../interfaces/EntrevistaRepository.js';

import { AnimalRepositoryMongo } from '../../../CRUDS/Animal/animalRepositoryMongo.js'; 
import { PersonaRepositoryMongo } from '../../../CRUDS/Persona/PersonaRepositoryMongo.js'; // Crear esta clase de mongo como la que hizo manu en animal
import { EntrevistaRepositoryMongo } from '../../../CRUDS/Entrevista/entrevistaRepositoryMongo.js'; // Crear esta clase de mongo como la que hizo manu en animal


export const AltaEntrevistaController = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const animalRepo: AnimalRepository = new AnimalRepositoryMongo() as any; 
        const personaRepo: PersonaRepository = new PersonaRepositoryMongo() as any; 
        const entrevistaRepo: EntrevistaRepository = new EntrevistaRepositoryMongo() as any;

        const servicio = new AltaEntrevista(
            animalRepo,
            personaRepo,
            entrevistaRepo
        );
        
        const datosEntrevista: EntrevistaDTO = req.body;

        const entrevistaConfirmada = await servicio.registrar(datosEntrevista);

        res.status(201).json(entrevistaConfirmada);

    } catch (error: any) {
    console.error('Error en AltaEntrevistaController:', error.message);

    const erroresDeNegocio = [
        'Inhabilitado para adoptar',
        'Adoptante no encontrado',
        'Animal no encontrado',
        'El animal no está disponible para adopción'
    ];

    if (erroresDeNegocio.includes(error.message)) {
        res.status(400).json({ message: error.message }); 

    } else {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
}