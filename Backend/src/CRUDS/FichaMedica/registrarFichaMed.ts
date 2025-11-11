import { FichaMedicaDTO } from '../../application/DTOs/FichaMedicaDTO.js';
import { FichaMedicaRepositoryMongo } from './fichaMedRepositoryMongo.js';
import { VacunaRepositoryMongo } from '../Vacunas/vacunaRepositoryMongo.js';

export class RegistrarFichaMedica {
    constructor(private readonly repo: FichaMedicaRepositoryMongo) {}

    async ejecutar(dto: FichaMedicaDTO): Promise<FichaMedicaDTO | string[]> {
        const errores: string[] = [];

        if (!dto.nro_ficha) {
            dto.nro_ficha = await this.repo.asignarNroFicha();
        }

        if (!dto.nro_animal || !dto.matricula || !dto.nro_vacunas || !dto.observaciones || !dto.fecha) {
            errores.push('Datos incompletos para registrar Ficha Medica');
            return errores;
        };

        const existente = await this.repo.buscarPorNro(dto.nro_ficha);
        if (existente) {
            errores.push('Ya existe una Ficha Medica con ese número');
            return errores;
        };

        const vacunasUsadas = dto.nro_vacunas;
        const vacunaRepo = new VacunaRepositoryMongo();
        for (const nro_vacuna of vacunasUsadas) {
            await vacunaRepo.restarStock(nro_vacuna, 1);
        }

        return await this.repo.registrar(dto);
    };
};