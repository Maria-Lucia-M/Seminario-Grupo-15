import { SeguimientoRepository } from "../../interfaces/SeguimientoRepository.js";

export class ObtenerSeguimientos {
    constructor(private readonly repo: SeguimientoRepository){};

    async ejecutar(): Promise<any[]>{
        const seguimientos = await this.repo.obtenerTodos();
        return seguimientos;
    };
};