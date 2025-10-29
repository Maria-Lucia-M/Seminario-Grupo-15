export type EstadoEntrevista = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'| 'CANCELADA';

export const estadoValido: EstadoEntrevista[] = ['PENDIENTE', 'APROBADA', 'RECHAZADA', 'CANCELADA'];

export interface EntrevistaDTO {
    id: string;
    nro_animal: string;
    id_colaborador: number;
    fecha_entrevista: Date;
    hora_entrevista: string;
    dni_adoptante: string;
    estado: EstadoEntrevista;
    descripcion: string | null ;
    fecha_rep: Date | null;
    hora_rep: string | null;
}