import { FichaMedicaDTO} from '../../application/DTOs/FichaMedicaDTO';

export function mapearFichaMedica(doc: any): FichaMedicaDTO {
    return {
        nro_ficha: doc.nro_ficha,
        nro_animal: doc.nro_animal,
        matricula: doc.matricula,
        nro_vacunas: doc.nro_vacunas,
        observaciones: doc.observaciones,
        fecha: doc.fecha
    };
};