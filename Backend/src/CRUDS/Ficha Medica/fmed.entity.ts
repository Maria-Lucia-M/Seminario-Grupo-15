export class FichaMedica {
    id_ficha: bigint;
    fecha: Date;
    id_animal: string;
    matricula_vet: string;
    observaciones: string;
    nro_vacunas: string[] | null;

    constructor(
        id_ficha: bigint,
        fecha: Date,
        id_animal: string,
        matricula_vet: string,
        observaciones: string,
        vacunas: string[]
    ) {
        this.id_ficha = id_ficha;
        this.fecha = fecha;
        this.id_animal = id_animal;
        this.matricula_vet = matricula_vet;
        this.observaciones = observaciones;
        this.nro_vacunas = vacunas;
    }

}