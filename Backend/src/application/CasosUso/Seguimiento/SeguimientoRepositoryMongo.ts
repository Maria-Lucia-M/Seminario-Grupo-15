import { SeguimientoDTO } from "../../DTOs/SeguimientoDTO.js";
import { SeguimientoRepository } from "../../interfaces/SeguimientoRepository.js";
import { SeguimientoModel } from "./Seguimiento.js";

export class SeguimientoRepositoryMongo implements SeguimientoRepository {
    async registrar(dto: SeguimientoDTO): Promise<SeguimientoDTO>{
        const seguimiento = new SeguimientoModel(dto);
        const guardado = await seguimiento.save();
        return guardado.toObject();
    };
};