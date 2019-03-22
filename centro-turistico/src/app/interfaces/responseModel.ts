export interface infoError {
    Message:string;
    Code: number;
}

export interface BaseResponse {
    result: boolean
    infoError: infoError;
}