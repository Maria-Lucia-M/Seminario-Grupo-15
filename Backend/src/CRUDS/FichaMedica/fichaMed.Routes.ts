import { Router } from 'express';
import { 
  findAllFichas, 
  getOneFichaMedica,
  registrarFichaMedicaController,
  actualizarFichaMedica, 
  eliminarFichaMedica, 
  } from './fichaMed.controler';

export const fichaMedicaRoutes = Router();

fichaMedicaRoutes.post('/fichasMed', registrarFichaMedicaController)
fichaMedicaRoutes.get('/fichasMed', findAllFichas)
fichaMedicaRoutes.get('/fichasMed/:id', getOneFichaMedica)
fichaMedicaRoutes.put('/fichasMed/:id', actualizarFichaMedica)
fichaMedicaRoutes.delete('/fichasMed/:id', eliminarFichaMedica)