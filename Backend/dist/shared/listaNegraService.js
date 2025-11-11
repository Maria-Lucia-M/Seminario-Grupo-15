import { ListaNegra } from '../CRUDS/ListaNegra/listaNegra.entity.js';
class ListaNegraService {
    constructor() {
        this.listaNegra = [];
    }
    static getInstance() {
        if (!ListaNegraService.instance) {
            ListaNegraService.instance = new ListaNegraService();
        }
        return ListaNegraService.instance;
    }
    agregar(adoptante, motivo) {
        const nuevoBloqueo = new ListaNegra(adoptante, motivo, new Date(), true);
        this.listaNegra.push(nuevoBloqueo);
        return nuevoBloqueo;
    }
    quitar(dni_adoptante) {
        const item = this.listaNegra.find(item => item.adoptante.dni === dni_adoptante && item.activo === true);
        if (item) {
            item.activo = false;
            return true;
        }
        return false;
    }
    estaEnListaNegra(dni_adoptante) {
        return this.listaNegra.find(item => item.adoptante.dni === dni_adoptante && item.activo === true) || null;
    }
    obtenerTodos() {
        return this.listaNegra.filter(item => item.activo === true);
    }
    obtenerPorDni(dni_adoptante) {
        return this.listaNegra.filter(item => item.adoptante.dni === dni_adoptante);
    }
    yaExiste(dni_adoptante) {
        return this.listaNegra.some(item => item.adoptante.dni === dni_adoptante && item.activo === true);
    }
}
export default ListaNegraService.getInstance();
//# sourceMappingURL=listaNegraService.js.map