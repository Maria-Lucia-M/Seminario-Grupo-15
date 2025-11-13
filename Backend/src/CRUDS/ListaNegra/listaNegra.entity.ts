import { Persona } from '../Persona/per.entity.js';

export class ListaNegra {
    adoptante: Persona;
    motivo: string;
    fecha_bloqueo: Date;
    activo: boolean;

    constructor(
        adoptante: Persona,
        motivo: string,
        fecha_bloqueo: Date,
        activo: boolean = true
    ) {
        this.adoptante = adoptante;
        this.motivo = motivo;
        this.fecha_bloqueo = fecha_bloqueo;
        this.activo = activo;
    }
}

