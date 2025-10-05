export interface FichaMedica {
    id_ficha: bigint;
    fecha: Date;
    id_animal: string;
    matricula_vet: string;
    observaciones: string;
    nro_vacunas: string[] | null;
}