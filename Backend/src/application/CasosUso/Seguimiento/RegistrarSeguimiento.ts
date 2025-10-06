import { SeguimientoDTO } from "../../DTOs/SeguimientoDTO.js";
import { SeguimientoRepository } from "../../interfaces/SeguimientoRepository.js";

export class RegistrarSeguimiento {
    constructor(private readonly repo: SeguimientoRepository){};

    async ejecutar(dto: SeguimientoDTO): Promise<SeguimientoDTO>{
        
    };
};