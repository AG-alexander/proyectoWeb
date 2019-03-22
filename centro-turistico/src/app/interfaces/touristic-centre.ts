
export interface TouristicCentre {
    idTouristicCentre: number; // identificador
    name: string; // nombre
    description: string; // descripcion
    schedules: string; // horarios
    photos: string[]; // potos
    video: string; // video
    followersList: number[]; // lista de segidores 
    reviews: number[];// 
    ratings: number; // calificacion
    country: string; // pais
    city: string; // ciudad
    region: string; // region
    direccion: string; // direccion
    phone: string; // telefono
}


export interface followerXSite
{
    id:number;
    siteId: number;
    userId: number;
}

export interface ratingXSite extends followerXSite{

    value: number;
}

export interface reviews extends followerXSite{

    title: string;
    description: string;
    date: Date;


}
