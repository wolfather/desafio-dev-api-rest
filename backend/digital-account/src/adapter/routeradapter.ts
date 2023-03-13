import { NextFunction, Request, Response } from "express";
import { PresenterImp } from "../implementation/presenter_implementation";

export class RouterAdapter {
    constructor() {}
    
    async adapt(route: PresenterImp<any>): Promise<any> {
        return async (
            request: Request, 
            response: Response, 
            _nextFunction?: NextFunction
        ): Promise<void> => {
            const adapterHttp = {
                body: request.body,
                json: response['json'],
                params: request.params,
                query: request.query,
                statusCode: response.statusCode
            };
            const routeAdapted = await route.handle(adapterHttp);
            response.set('Access-Control-Allow-Origin', '*');
            response.status(adapterHttp.statusCode).json(routeAdapted);
        };
    }
}