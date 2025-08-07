import { StandardResponse } from "../interfaces/response";

export function success<T>(message:string, data?:T): StandardResponse{
    return{
        status: 'success',
        message,
        data
    }
}

export function failed(message:string, error?:any): StandardResponse{
    return{
        status: 'failed',
        message,
        error
    }
}