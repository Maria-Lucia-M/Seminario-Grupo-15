import { Router } from 'express';
import { findAllAnimales, getOneAnimal, registrarAnimalController, actualizarAnimal, eliminarAnimal } from './animal.controler.js';
export const animalRoutes = Router();
animalRoutes.get('/animales', findAllAnimales);
animalRoutes.get('/animales/:nro', getOneAnimal);
animalRoutes.post('/animales', registrarAnimalController);
animalRoutes.put('/animales/:nro', actualizarAnimal);
animalRoutes.delete('/animales/:nro', eliminarAnimal);
//# sourceMappingURL=animal.Routes.js.map