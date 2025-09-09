import { Router } from 'express';
import { PersonaController } from './pers.controler';
const router = Router();
const personaController = new PersonaController();
export function setRoutes(app) {
    app.post('/personas', personaController.createPersona.bind(personaController));
    app.get('/personas/:dni', personaController.getPersona.bind(personaController));
    app.put('/personas/:dni', personaController.updatePersona.bind(personaController));
    app.delete('/personas/:dni', personaController.deletePersona.bind(personaController));
}
//# sourceMappingURL=persona.Routes.js.map