export interface Animal {
    nro: bigint;
    especie: string;
    raza: string;
    edad_estimada: bigint;
    fecha_ingreso: Date;
    fecha_defuncion: Date | null;
    estado: { disponible: boolean; no_disponible: boolean };
    imagen: string[];
    video: string[]; 
}