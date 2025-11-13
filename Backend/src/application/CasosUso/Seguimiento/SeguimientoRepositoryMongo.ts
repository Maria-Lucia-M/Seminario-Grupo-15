import { SeguimientoDTO } from "../../DTOs/SeguimientoDTO.js";
import { SeguimientoRepository } from "../../interfaces/SeguimientoRepository.js";
<<<<<<< HEAD
import { SeguimientoModel } from "../../CasosUso/Seguimiento/Seguimiento.js";
=======
import { SeguimientoModel } from '../../CasosUso/Seguimiento/Seguimiento.js';
>>>>>>> 7dd6bb806760a13fc91f63e65ced966d092e8bba

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