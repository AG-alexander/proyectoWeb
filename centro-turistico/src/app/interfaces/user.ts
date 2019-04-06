export interface User {
    idUser: number; // identificador
    userName: string; // nombre
    password: string; // contraseña
    email: string; // correo
    descripcion: string; // descripcion
    iconno: string; // icono
    string: Date; // fecha nacimineto
    tipo: string; // tipo
}

export interface EditorxSitio {
    id: number;
    idUser: number;
    siteId: number;

}
