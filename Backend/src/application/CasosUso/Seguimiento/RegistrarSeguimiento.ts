import { SeguimientoDTO } from "../../DTOs/SeguimientoDTO.js";
import { SeguimientoRepository } from "../../interfaces/SeguimientoRepository.js";

export class RegistrarSeguimiento {
    constructor(private readonly repo: SeguimientoRepository){};

    async ejecutar(dto: SeguimientoDTO): Promise<SeguimientoDTO | string[]>{
        const errores: string[] = [];
        if (!dto.nro_adopcion || !dto.fecha_seguimiento || !dto.estado_animal || !dto.entorno) {
            errores.push("Datos incompletos para registrar seguimiento");
            return errores;
        };

        if (dto.estado_animal === "No apto") {
            errores.push("El animal no es apto para adopcion");
            return errores;
        };

        const seguimiento = await this.repo.registrar(dto);
        return seguimiento
    };
};