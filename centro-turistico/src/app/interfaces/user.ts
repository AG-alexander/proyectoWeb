import { Rol } from './rol';

export interface User {
    idUser: number; // identificador
    userName: string; // nombre
    password: string; // contraseña
    email: string; // correo
    descripcion: string; // descripcion
    iconno: string; // icono
    string: Date; // fecha nacimineto
    rol: string; // rol
}

export interface EditorxSitio {
    id: number;
    idUser: number;
    siteId: number;

}
