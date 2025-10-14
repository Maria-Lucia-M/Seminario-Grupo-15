type Especie = 'Perro' | 'Gato';

type Estado = 'Apto' | 'No apto' | 'En adopcion' | 'Adoptado';

export interface AnimalDTO {
    nro: number;
    especie: Especie;
    raza: string;
    edad_estimada: number;
    fecha_ingreso: Date;
    fecha_defuncion: Date | null;
    estado: Estado;
    imagen: string;
    video: string | null;
};