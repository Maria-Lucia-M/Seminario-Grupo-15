export class Persona {
    dni;
    nombre;
    apellido;
    mail;
    contraseña;
    telefono;
    veterinario;
    adoptante;
    colaborador;
    constructor(dni, nombre, apellido, mail, contraseña, telefono, veterinario = null, adoptante = null, colaborador = null) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.veterinario = veterinario;
        this.adoptante = adoptante;
        this.colaborador = colaborador;
    }
}
//# sourceMappingURL=per.entity.js.map