export interface Review {
    idReview: number;
    title: string;
    description: string;
    date: Date;
    idUser: string;
    idSitio: string;
    img: string;
    dunnoReview: string;
    userName: string;
    blocked: boolean;
    id?: string;
}
