import { FichaMedicaDTO } from "../../DTOs/FichaMedicaDTO.js";
import { FichaMedicaRepository } from "../../interfaces/FichaMedicaRepository.js";

export class RegistrarColocacionVacunas {
    constructor(private readonly repo: FichaMedicaRepository){};

    async ejecutar(dto: FichaMedicaDTO): Promise<FichaMedicaDTO | string[]>{
        const errores: string[] = [];
        if (!dto.nro_ficha || !dto.nro_animal || !dto.matricula || !dto.nro_vacunas || !dto.observaciones || !dto.fecha) {
            errores.push("Datos incompletos para registrar ficha medica");
            return errores;
        };
        const fichaMedica = await this.repo.registrar(dto);
        return fichaMedica
    };
};