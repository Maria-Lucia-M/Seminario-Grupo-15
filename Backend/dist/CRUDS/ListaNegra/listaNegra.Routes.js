import { Router } from 'express';
import { ListaNegraController } from './listaNegra.controller.js';
const listaNegraController = new ListaNegraController();
export const listaNegraRoutes = Router();
listaNegraRoutes.post('/lista-negra', listaNegraController.agregarAListaNegra.bind(listaNegraController));
listaNegraRoutes.get('/lista-negra', listaNegraController.obtenerListaNegra.bind(listaNegraController));
listaNegraRoutes.get('/lista-negra/:dni_adoptante', listaNegraController.verificarEnListaNegra.bind(listaNegraController));
listaNegraRoutes.get('/lista-negra/historial/:dni_adoptante', listaNegraController.obtenerPorDni.bind(listaNegraController));
listaNegraRoutes.delete('/lista-negra/:dni_adoptante', listaNegraController.quitarDeListaNegra.bind(listaNegraController));
//# sourceMappingURL=listaNegra.Routes.js.map