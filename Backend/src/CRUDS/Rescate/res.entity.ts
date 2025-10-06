export class Rescate {
    lugar_rescate: string;
    fecha_rescate: Date;
    nro_animal: number;
    dni_rescatista: string;

    constructor(lugar_rescate: string, fecha_rescate: Date, nro_animal: number, dni_rescatista: string) {
        this.lugar_rescate = lugar_rescate;
        this.fecha_rescate = fecha_rescate;
        this.nro_animal = nro_animal;
        this.dni_rescatista = dni_rescatista;
    }
}