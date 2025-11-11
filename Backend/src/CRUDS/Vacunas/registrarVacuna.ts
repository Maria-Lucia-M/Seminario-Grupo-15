import { Vacuna} from '../../application/DTOs/VacunaDTO.js';
import { VacunaRepositoryMongo } from './vacunaRepositoryMongo.js';

export class RegistrarVacuna {
    constructor(private readonly repo: VacunaRepositoryMongo) {}

    async ejecutar(dto: Vacuna): Promise<Vacuna | string[]> {
        const errores: string[] = [];

        if (!dto.nro_vacuna || !dto.nombre || !dto.fecha_vencimiento || !dto.droga || !dto.stock || !dto.fecha_ingreso) {
            errores.push('Datos incompletos para registrar Vacuna');
            return errores;
        };

        const existente = await this.repo.buscarPorNro(dto.nro_vacuna);
        if (existente) {
            errores.push('Ya existe una Vacuna con ese número');
            return errores;
        }
        
        return await this.repo.registrar(dto);
    };
}