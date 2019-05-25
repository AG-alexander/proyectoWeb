import { Rol } from './rol';
import { Images } from './imges';

export interface User {
    idUser?: number; // identificador
    userName: string; // nombre
    password: string; // contraseña
    email: string; // correo
    descripcion: string; // descripcion
    iconno: Images; // icono
    string?: Date; // fecha nacimineto
    rol: string; // rol
    id: string;
}

export interface EditorxSitio {
    id: number;
    idUser: number;
    siteId: number;

}
