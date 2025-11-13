export interface FichaMedicaDTO {
  nro_ficha: number;
  nro_animal: number;
  matricula: string;
  nro_vacunas: number[];
  observaciones?: string | null;
  fecha: Date;
}