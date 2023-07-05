export class Usuarios {
    public id: number;
    public nombre: string;
    public contraseña:string;
    public email:string;
    
    constructor(id:number,nombre: string,contraseña:string,email:string) {
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.email = email;
    }
}