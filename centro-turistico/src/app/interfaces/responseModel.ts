export interface infoError {
    message:string;
    Code: number;
}

export interface BaseResponse {
    result: boolean
    infoError: infoError;
}