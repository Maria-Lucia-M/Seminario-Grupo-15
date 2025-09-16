export interface Adopcion {
    nro_adopcion: number;
    nro_animal: number;
    dni_adoptante: number;
    fecha_adopcion: Date;
    fecha_retiro: Date | null;
    motivos_retiro: string;
    evidencia_maltrato: string | null;
}
