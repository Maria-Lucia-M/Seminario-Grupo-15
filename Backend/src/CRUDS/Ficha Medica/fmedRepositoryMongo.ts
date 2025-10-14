import { FichaMedicaDTO } from "../../application/DTOs/FichaMedicaDTO.js";
import { FichaMedicaRepository } from "../../application/interfaces/FichaMedicaRepository";
import { FichaMedicaModel } from "./fmed.model.js";

export class FichaMedicaRepositoryMongo implements FichaMedicaRepository {
    async registrar(dto: FichaMedicaDTO): Promise<FichaMedicaDTO>{
        const ficha = new FichaMedicaModel(dto);
        const guardado = await ficha.save();
        return guardado.toObject();
    };
}