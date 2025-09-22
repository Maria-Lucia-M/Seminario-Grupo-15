import { Adoptante } from '../../application/DTOs/PersonaDTO';
import { Colaborador } from '../../application/DTOs/PersonaDTO';

export interface Entrevista {
     id_entrevista: bigint;
    fecha: Date;
    hora: Date;
    fecha_rep: Date | null;
    hora_rep: Date | null;
    estado_ent: { pendiente: boolean; rechazada: boolean; aprobada: boolean; cancelada: boolean };
    descripcion: string;
    adopcion_aprobada: boolean;
    adoptante_dni: number;
    colaborador_id: number;
}