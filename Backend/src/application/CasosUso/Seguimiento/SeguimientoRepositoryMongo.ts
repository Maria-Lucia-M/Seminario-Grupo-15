import { SeguimientoDTO } from "../../DTOs/SeguimientoDTO.js";
import { SeguimientoRepository } from "../../interfaces/SeguimientoRepository.js";
import { SeguimientoModel } from '../../CasosUso/Seguimiento/Seguimiento.js';

export class SeguimientoRepositoryMongo implements SeguimientoRepository {
    async registrar(dto: SeguimientoDTO): Promise<SeguimientoDTO>{
        const seguimiento = new SeguimientoModel(dto);
        const guardado = await seguimiento.save();
        return guardado.toObject();
    };

    async obtenerTodos(): Promise<SeguimientoDTO[]>{
        const seguimientos = await SeguimientoModel.find().lean();
        return seguimientos;
    };
};