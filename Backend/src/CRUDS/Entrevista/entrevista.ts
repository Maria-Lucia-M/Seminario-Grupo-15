export interface Entrevista {
    id_entrevista: bigint;
    fecha: Date;
    hora: Date;
    fecha_rep: Date | null;
    hora_rep: Date | null;
    estado_ent: { pendiente: boolean; rechazada: boolean; aprobada: boolean; cancelada: boolean };
    descripcion: string;
    adopcion_aprobada: boolean;
    adoptante_dni: string;
    colaborador_id: number;
}