export type EstadoEntrevista = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'| 'CANCELADA';

export const estadoValido: EstadoEntrevista[] = ['PENDIENTE', 'APROBADA', 'RECHAZADA', 'CANCELADA'];

export interface EntrevistaDTO {
    id: string;
    nro_animal: number;
    id_colaborador: string;
    fecha_entrevista: Date;
    hora_entrevista: string;
    dni_adoptante: number;
    estado: EstadoEntrevista;
    descripcion: string | null ;
    fecha_rep: Date | null;
    hora_rep: string | null;
}