export class ObtenerSeguimientos {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar() {
        const seguimientos = await this.repo.obtenerTodos();
        return seguimientos;
    }
    ;
}
;
//# sourceMappingURL=ObtenerSeguimientos.js.map