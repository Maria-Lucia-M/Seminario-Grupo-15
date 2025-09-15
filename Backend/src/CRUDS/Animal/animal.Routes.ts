import { Router } from 'express';
import { AnimalController } from './ani.controler';

const router = Router();
const animalController = new AnimalController();

export function setRoutes(app: Router) {
    app.post('/animales', animalController.createAnimal.bind(animalController));
    app.get('/animales/:nro', animalController.getAnimal.bind(animalController));
    app.put('/animales/:nro', animalController.updateAnimal.bind(animalController));
    app.delete('/animales/:nro', animalController.deleteAnimal.bind(animalController));
}