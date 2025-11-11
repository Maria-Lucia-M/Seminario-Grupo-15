import { ListaNegra } from '../CRUDS/ListaNegra/listaNegra.entity.js';
import { Persona } from '../CRUDS/Persona/per.entity.js';

class ListaNegraService {
    private listaNegra: ListaNegra[] = [];
    private static instance: ListaNegraService;

    private constructor() {}

    public static getInstance(): ListaNegraService {
        if (!ListaNegraService.instance) {
            ListaNegraService.instance = new ListaNegraService();
        }
        return ListaNegraService.instance;
    }

    public agregar(adoptante: Persona, motivo: string): ListaNegra {
        const nuevoBloqueo = new ListaNegra(adoptante, motivo, new Date(), true);
        this.listaNegra.push(nuevoBloqueo);
        return nuevoBloqueo;
    }

    public quitar(dni_adoptante: string): boolean {
        const item = this.listaNegra.find(
            item => item.adoptante.dni === dni_adoptante && item.activo === true
        );
        if (item) {
            item.activo = false;
            return true;
        }
        return false;
    }

    public estaEnListaNegra(dni_adoptante: string): ListaNegra | null {
        return this.listaNegra.find(
            item => item.adoptante.dni === dni_adoptante && item.activo === true
        ) || null;
    }

    public obtenerTodos(): ListaNegra[] {
        return this.listaNegra.filter(item => item.activo === true);
    }

    public obtenerPorDni(dni_adoptante: string): ListaNegra[] {
        return this.listaNegra.filter(item => item.adoptante.dni === dni_adoptante);
    }

    public yaExiste(dni_adoptante: string): boolean {
        return this.listaNegra.some(
            item => item.adoptante.dni === dni_adoptante && item.activo === true
        );
    }
}

export default ListaNegraService.getInstance();

