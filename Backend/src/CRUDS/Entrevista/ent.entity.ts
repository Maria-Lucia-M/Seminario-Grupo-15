export class Entrevista {
    id_entrevista: bigint;
    fecha: Date;
    hora: Date;
    fecha_rep: Date | null;
    hora_rep: Date | null;
    estado_ent: { pendiente: boolean; rechazada: boolean; aprobada: boolean; cancelada: boolean };
    descripcion: string;
    adopcion_aprobada: boolean;
    adoptante_dni: string; // Solo el DNI
    colaborador_id: number; // Solo el ID

    constructor(
        id_entrevista: bigint,
        fecha: Date,
        hora: Date,
        fecha_rep: Date | null,
        hora_rep: Date | null,
        estado_ent: { pendiente: boolean; rechazada: boolean; aprobada: boolean; cancelada: boolean },
        descripcion: string,
        adopcion_aprobada: boolean,
        adoptante_dni: string,
        colaborador_id: number
    ) {
        this.id_entrevista = id_entrevista;
        this.fecha = fecha;
        this.hora = hora;
        this.fecha_rep = fecha_rep;
        this.hora_rep = hora_rep;
        this.estado_ent = estado_ent;
        this.descripcion = descripcion;
        this.adopcion_aprobada = adopcion_aprobada;
        this.adoptante_dni = adoptante_dni;
        this.colaborador_id = colaborador_id;
    }
}