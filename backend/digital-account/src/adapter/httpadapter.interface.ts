import { Request } from "express";

export interface HttpRequestAdapter {
    body: Request['body'];
    query: Request['query'];
    params: Request['params'];
}

export interface HttpResponseAdapter<T> {
    data: Partial<T|T[]>;
    statusCode: Response['status'];
    message: string;
}