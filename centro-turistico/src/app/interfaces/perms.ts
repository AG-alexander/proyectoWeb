export interface roles {
    id: number;
    rol: string;
    active: boolean;
}

export interface perms {
    id: number;
    perm: string;
    active: boolean;
}

export interface permXRol {
    id: number;
    idperm: number;
    rolId: number;
}

export interface rolXuser {
    id: number;
    UserId: number;
    rolId: number;

}