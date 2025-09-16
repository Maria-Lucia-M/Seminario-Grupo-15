export class Adopcion {
    nro_adopcion: number;
    nro_animal: number;
    dni_adoptante: number;
    fecha_adopcion: Date;
    fecha_retiro: Date | null;
    motivos_retiro: string;
    evidencia_maltrato: string | null;

    constructor(
          nro_adopcion: number,
          nro_animal: number,
          dni_adoptante: number,
          fecha_adopcion: Date,
          fecha_retiro: Date | null,
          motivos_retiro: string,
          evidencia_maltrato: string | null
    ) {
        this.nro_adopcion = nro_adopcion;
        this.nro_animal = nro_animal;
        this.dni_adoptante = dni_adoptante;
        this.fecha_adopcion = fecha_adopcion;
        this.fecha_retiro = fecha_retiro;
        this.motivos_retiro = motivos_retiro;
        this.evidencia_maltrato = evidencia_maltrato;
    }
}