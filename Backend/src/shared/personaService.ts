import { Persona } from '../CRUDS/Persona/per.entity.js';

class AdoptanteService {
    private adoptantes: Persona[] = [];
    private static instance: AdoptanteService;

    private constructor() {}

    public static getInstance(): AdoptanteService {
        if (!AdoptanteService.instance) {
            AdoptanteService.instance = new AdoptanteService();
        }
        return AdoptanteService.instance;
    }

    public agregarAdoptante(persona: Persona): void {
        // Solo agregar si es un adoptante
        if (persona.adoptante !== null) {
            // Verificar si ya existe para evitar duplicados
            const existe = this.adoptantes.find(a => a.dni === persona.dni);
            if (!existe) {
                this.adoptantes.push(persona);
            }
        }
    }

    public obtenerAdoptante(dni: string): Persona | null {
        return this.adoptantes.find(a => a.dni === dni) || null;
    }

    public obtenerTodos(): Persona[] {
        return this.adoptantes;
    }

    public esAdoptante(dni: string): boolean {
        return this.obtenerAdoptante(dni) !== null;
    }
}

export default AdoptanteService.getInstance();

