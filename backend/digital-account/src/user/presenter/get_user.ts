import { Request, Response } from "express";
import { PresenterImp } from "../implementation/presenter_implementation";
import { UserUsecaseImplementation } from "../implementation/user_usecase_implementation";

export class GetUserPresenter implements PresenterImp {
    
    constructor(
        private readonly getUserUsecase: UserUsecaseImplementation<string>
    ) {}

    async handle(req: Request, res: Response): Promise<any> {
        try {
            const { documentnumber } = req.body;

            const {
                data, 
                success, 
                statusCode, 
                message
            } = await this.getUserUsecase.execute(documentnumber);
            
            if (statusCode === 200 && success) { 
                res.json({
                    data,
                    statusCode
                })
            } else {
                res.json({
                    statusCode, 
                    message
                });
            }

        } catch(err) {
            res.json({
                statusCode: 500,
                message: 'Server error',
            });
        }
    }
}
