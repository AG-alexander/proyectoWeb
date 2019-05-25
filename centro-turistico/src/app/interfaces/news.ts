import { Images } from './imges';

export interface News {
    idNews?: number; // identificacion
    title: string;// titulo
    content: string; // contenido
    date: Date; // fecha
    image: Images; // imagen
    id?: string; // firebase id
}
