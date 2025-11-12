import { EntrevistaDTO, EstadoEntrevista } from '../../application/DTOs/EntrevistaDTO.js';

export function mapearEntrevista(doc: any): EntrevistaDTO {
    return {
        id: doc._id.toString(), 
        nro_animal: doc.nro_animal,
        id_colaborador: doc.id_colaborador,
        fecha_entrevista: doc.fecha_entrevista,
        hora_entrevista: doc.hora_entrevista,
        dni_adoptante: doc.dni_adoptante,
        estado: doc.estado as EstadoEntrevista,
        descripcion: doc.descripcion,
        fecha_rep: doc.fecha_rep,
        hora_rep: doc.hora_rep
    };
};