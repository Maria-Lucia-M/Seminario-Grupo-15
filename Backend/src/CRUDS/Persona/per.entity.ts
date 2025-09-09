export class Persona {
    dni: string;
    nombre: string;
    apellido: string;
    mail: string;
    contraseña: string;
    telefono: string;

    constructor(dni: string, nombre: string, apellido: string, mail: string, contraseña: string, telefono: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.contraseña = contraseña;
        this.telefono = telefono;
    }
}