import { Router } from 'express';
import {
    findAllPersona,
    getOnePersona,
    addPersona,
    updatePersona,
    removePersona,
    signupPersona,
    findAdoptantesAptos,
    findColaboradores,
    findAdoptantesListaNegra,
    agregarAListaNegra,
    quitarDeListaNegra,
    findTodosAdoptantes
} from './persona.controller.js';

export const personaRouter = Router();
personaRouter.get('/adoptantes-aptos', findAdoptantesAptos);
personaRouter.get('/colaboradores', findColaboradores);
personaRouter.get('/adoptantes-lista-negra', findAdoptantesListaNegra);
personaRouter.get('/todos-adoptantes', findTodosAdoptantes);
personaRouter.put('/lista-negra/agregar/:dni', agregarAListaNegra);
personaRouter.put('/lista-negra/quitar/:dni', quitarDeListaNegra);
personaRouter.get('/', findAllPersona);
personaRouter.get('/:dni', getOnePersona);
personaRouter.post('/', addPersona);
personaRouter.put('/:dni', updatePersona);
personaRouter.delete('/:dni', removePersona);
personaRouter.post('/signup', signupPersona);