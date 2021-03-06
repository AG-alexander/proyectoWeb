import { Review } from './review';
import { Images } from './imges';

export interface TouristicCentre {
    idTouristicCentre: number; // identificador
    name: string; // nombre
    description: string; // descripcion
    schedules: string[]; // horarios
    photos: Images[]; // potos
    video: string; // video
    followersList: number[]; // lista de segidores 
    reviews: number[];// 
    ratings: number; // calificacion
    country: string; // pais
    city: string; // ciudad
    region: string; // region
    direccion: string; // direccion
    phone: string; // telefono
    idEditor: string;
    id?: string; // id de firebase
}


export interface followerXSite
{
    id?: string;
    siteId?: string;
    userId?: string;
}

export interface ratingXSite extends followerXSite{

    value: number;
}

export interface reviews extends followerXSite{

    title: string;
    description: string;
    date: Date;
}

export interface reviewsModel extends reviews {
    user: string;
}

export interface followerModel extends followerXSite
{
    user?: string;
    img?: string;
}

export interface userInfo
{
    nameSite: string;
    ratingSite: number;
    reviewsList: Review[];
}
