import { Request, Response } from "express";

export interface PresenterImp {
    handle(req: Request, res: Response): Promise<any>;
}
