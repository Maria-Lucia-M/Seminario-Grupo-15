import { Request, Response } from 'express';
import { AltaEntrevista } from './AltaEntrevista.js';
import { EntrevistaDTO } from '../../DTOs/EntrevistaDTO.js';

// Importar los repositorios con los metodos
import { AnimalRepository } from '../../interfaces/AnimalRepository.js';
import { PersonaRepository } from '../../interfaces/PersonaRepository.js'; //crear esta interfaz
import { EntrevistaRepository } from '../../interfaces/EntrevistaRepository.js';

// Importar los repositorios concretos de Mongo
import { AnimalRepositoryMongo } from '../../../CRUDS/Animal/animalRepositoryMongo.js'; 
import { PersonaRepositoryMongo } from '../../../CRUDS/Persona/PersonaRepositoryMongo.js'; // Crear esta clase de mongo como la que hizo manu en animal
import { EntrevistaRepositoryMongo } from '../../../CRUDS/Entrevista/EntrevistaRepositoryMongo.js'; // Crear esta clase de mongo como la que hizo manu en animal


export const AltaEntrevistaController = async (req: Request, res: Response): Promise<void> => {
    
    try {
        // (C) Instanciar todo DENTRO de la función
        
        // TODO: Reemplaza 'any' cuando tengas las clases Mongo implementadas
        // Es necesario instanciar las implementaciones concretas (Mongo), no las interfaces.
        const animalRepo: AnimalRepository = new AnimalRepositoryMongo() as any; 
        const personaRepo: PersonaRepository = new PersonaRepositoryMongo() as any; // TODO: Implementar esta clase
        const entrevistaRepo: EntrevistaRepository = new EntrevistaRepositoryMongo() as any; // TODO: Implementar esta clase

        const servicio = new AltaEntrevista(
            animalRepo,
            personaRepo,
            entrevistaRepo
        );
        
        // 1. Tomamos los datos del body
        const datosEntrevista: EntrevistaDTO = req.body;

        // 2. Llamamos al servicio
        const entrevistaConfirmada = await servicio.registrar(datosEntrevista);

        // 3. Respondemos
        res.status(201).json(entrevistaConfirmada);

    } catch (error: any) {
        if (error.message === 'Inhabilitado para adoptar') {
            res.status(403).json({ mensaje: error.message });
        } else {
            console.error('Error en AltaEntrevistaController:', error.message);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }
};