export class Animal {
    nro: bigint;
    especie: string;
    raza: string;
    edad_estimada: bigint;
    fecha_ingreso: Date;
    fecha_defuncion: Date | null;
    estado: { disponible: boolean; no_disponible: boolean };
    imagen: string[];
    video: string[]; 

    constructor(
        nro: bigint,
        especie: string,
        raza: string,
        edad_estimada: bigint,
        fecha_ingreso: Date,
        fecha_defuncion: Date | null,
        estado: { disponible: boolean; no_disponible: boolean },
        imagen: string[],
        video: string[]
    ) {
        this.nro = nro;
        this.especie = especie;
        this.raza = raza;
        this.edad_estimada = edad_estimada;
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_defuncion = fecha_defuncion;
        this.estado = estado;
        this.imagen = imagen;
        this.video = video;
    }
}