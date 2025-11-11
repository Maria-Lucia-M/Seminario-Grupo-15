import { Router } from 'express';
import { validarVacunas, findAllVacunas, getOneVacuna, registrarVacunaController, actualizarVacuna, eliminarVacuna } from './vacu.controller.js';

export const vacunaRouter = Router();

vacunaRouter.get('/vacunas', findAllVacunas);
vacunaRouter.get('/vacunas/:nro_vacuna', getOneVacuna);
vacunaRouter.post('/vacunas', registrarVacunaController);
vacunaRouter.post('/vacunas/validar', validarVacunas);
vacunaRouter.put('/vacunas/:nro_vacuna', actualizarVacuna);
vacunaRouter.delete('/vacunas/:nro_vacuna', eliminarVacuna);
