import { AnimalRepository } from "../../interfaces/AnimalRepository.js";
export class ObtenerAltas {
    constructor(private readonly repo: AnimalRepository){};

    async ejecutar(): Promise<any[]>{
        const altas = await this.repo.obtenerTodos();
        return altas;
    };
};