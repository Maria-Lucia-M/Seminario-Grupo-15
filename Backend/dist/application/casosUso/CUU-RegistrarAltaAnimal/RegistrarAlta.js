export class RegistrarAlta {
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar(dto) {
        const errores = [];
        // Validar datos requeridos
        if (!dto.nro ||
            !dto.especie ||
            !dto.raza ||
            !dto.edad_estimada ||
            !dto.fecha_ingreso ||
            !dto.imagen) {
            errores.push("Datos incompletos para registrar alta de animal");
            return errores;
        }
        ;
        // Cambiar estado a 'Apto' si estaba 'No Apto'
        if (dto.estado === "No apto") {
            dto.estado = "Apto";
        }
        ;
        // Registrar el alta en el repositorio
        const animalRegistrado = await this.repo.registrar(dto);
        return animalRegistrado;
    }
    ;
}
;
//# sourceMappingURL=RegistrarAlta.js.map