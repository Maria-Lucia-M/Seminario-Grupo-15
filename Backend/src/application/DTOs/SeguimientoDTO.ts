export interface SeguimientoDTO {
    nro_adopcion: number; // FK
    fecha_seguimiento: Date;
    entorno: string;
    estado_animal: 'No adoptado' | 'Adoptado' | 'No apto';
};