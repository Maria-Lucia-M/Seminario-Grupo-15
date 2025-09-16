export interface Donacion {
    nro_donacion: number;
    tipo: string;
    cantidad: number;
    descripcion: string;
    fecha_vencimiento: Date | null;
}