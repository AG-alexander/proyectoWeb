
export  interface photos{
     id: number;
     imagen: string;
}

export  interface imageXUser extends photos {
    userId: number;
}

export  interface imageXSite extends photos {
    siteId: number;
}
