import { Router } from 'express';
import {
    findAllPersona,
    getOnePersona,
    addPersona,
    updatePersona,
    removePersona,
    findAdoptantesAptos,
    findColaboradores 
} from './persona.controller.js';

export const personaRouter = Router();
personaRouter.get('/adoptantes-aptos', findAdoptantesAptos);
personaRouter.get('/colaboradores', findColaboradores);
personaRouter.get('/', findAllPersona);
personaRouter.get('/:dni', getOnePersona);
personaRouter.post('/', addPersona);
personaRouter.put('/:dni', updatePersona);
personaRouter.delete('/:dni', removePersona);