import { RescatistaDTO } from "../../application/DTOs/RescatistaDTO";
import { RescatistaRepositoryMongo } from "./rescatistaRepositoryMongo.js";

export class RegistrarRescatista {
    constructor(private readonly repo: RescatistaRepositoryMongo) {}
    async ejecutar(dto: RescatistaDTO): Promise<RescatistaDTO | string[]> {
        const errores: string[] = [];
        if (!dto.dni || !dto.nombre || !dto.apellido || !dto.telefono) {
            errores.push('Datos incompletos para registrar rescatista');
            return errores;
        };

        const existente = await this.repo.buscarPorNro(dto.dni);
        if (existente) {
            errores.push('Ya existe un rescatista con ese DNI');
            return errores;
        };

        return await this.repo.create(dto);
    };
}