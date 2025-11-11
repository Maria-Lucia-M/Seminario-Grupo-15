class AdoptanteService {
    constructor() {
        this.adoptantes = [];
    }
    static getInstance() {
        if (!AdoptanteService.instance) {
            AdoptanteService.instance = new AdoptanteService();
        }
        return AdoptanteService.instance;
    }
    agregarAdoptante(persona) {
        // Solo agregar si es un adoptante
        if (persona.adoptante !== null) {
            // Verificar si ya existe para evitar duplicados
            const existe = this.adoptantes.find(a => a.dni === persona.dni);
            if (!existe) {
                this.adoptantes.push(persona);
            }
        }
    }
    obtenerAdoptante(dni) {
        return this.adoptantes.find(a => a.dni === dni) || null;
    }
    obtenerTodos() {
        return this.adoptantes;
    }
    esAdoptante(dni) {
        return this.obtenerAdoptante(dni) !== null;
    }
}
export default AdoptanteService.getInstance();
//# sourceMappingURL=personaService.js.map