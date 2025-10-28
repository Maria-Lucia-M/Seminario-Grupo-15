import { RescateDTO } from "../../application/DTOs/RescateDTO";
import { RescateRepositoryMongo } from "./rescateRepositoryMongo";

export class RegistrarRescate {
    constructor(private readonly repo: RescateRepositoryMongo) {}

    async ejecutar(dto: RescateDTO): Promise<RescateDTO | string[]> {
        const errores: string[] = [];

        if (!dto.lugar_rescate || !dto.fecha_rescate || !dto.nro_animal || !dto.dni_rescatista) {
            errores.push('Datos incompletos para registrar rescate');
            return errores;
        };

        const existente = await this.repo.obtenerRescatePorNroAnimal(dto.nro_animal);
        if (existente) {
            errores.push('Ya existe un rescate para ese número de animal');
            return errores;
        };

        return await this.repo.crearRescate(dto);
    };
}