export class Entrevista {
    id_entrevista: bigint;
    fecha: Date;
    hora: Date;
    fecha_rep: Date | null;
    hora_rep: Date | null;
    estado_ent: { pendiente: boolean; rechazada: boolean; aprobada: boolean; cancelada: boolean };
    descripcion: string;
    adopcion_aprobada: boolean;

    constructor(
        id_entrevista: bigint,
        fecha: Date,
        hora: Date,
        fecha_rep: Date | null,
        hora_rep: Date | null,
        estado_ent: { pendiente: boolean; rechazada: boolean; aprobada: boolean; cancelada: boolean },
        descripcion: string,
        adopcion_aprobada: boolean
    ) {
        this.id_entrevista = id_entrevista;
        this.fecha = fecha;
        this.hora = hora;
        this.fecha_rep = fecha_rep;
        this.hora_rep = hora_rep;
        this.estado_ent = estado_ent;
        this.descripcion = descripcion;
        this.adopcion_aprobada = adopcion_aprobada;
    }
}