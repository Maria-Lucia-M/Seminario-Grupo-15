export interface SeguimientoDTO {
    nro_adopcion: number; // FK
    fecha_seguimiento: Date;
    entorno: string;
    estado_animal: 'Apto' | 'No apto' | 'En adopcion' | 'Adoptado';
};