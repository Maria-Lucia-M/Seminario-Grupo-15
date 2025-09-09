export interface AdopcionDTO {
    nro_adopcion: number;
    nro_animal: number;
    dni_adoptante: number;
    fecha_adopcion: Date;
    motivos_retiro: string;
    evidencia_maltrato: string | null;
};