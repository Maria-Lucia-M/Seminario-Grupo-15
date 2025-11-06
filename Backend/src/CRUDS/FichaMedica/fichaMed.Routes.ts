import { Router } from 'express';
import { 
  findAllFichas, 
  getOneFichaMedica,
  registrarFichaMedicaController,
  actualizarFichaMedica, 
  eliminarFichaMedica, 
  } from './fichaMed.controler.js';

export const fichaMedicaRoutes = Router();

fichaMedicaRoutes.post('/fichasMed', registrarFichaMedicaController)
fichaMedicaRoutes.get('/fichasMed', findAllFichas)
fichaMedicaRoutes.get('/fichasMed/:nro_ficha', getOneFichaMedica)
fichaMedicaRoutes.put('/fichasMed/:nro_ficha', actualizarFichaMedica)
fichaMedicaRoutes.delete('/fichasMed/:nro_ficha', eliminarFichaMedica)