import { Router } from 'express';
import {
    findAllPersona,
    getOnePersona,
    addPersona,
    updatePersona,
    removePersona
} from './persona.controller.js';

export const personaRouter = Router();

personaRouter.get('/', findAllPersona);
personaRouter.get('/:dni', getOnePersona);
personaRouter.post('/', addPersona);
personaRouter.put('/:dni', updatePersona);
personaRouter.delete('/:dni', removePersona);