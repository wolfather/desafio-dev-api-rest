import { Request, Response } from "express";
import { PresenterImp } from "../implementation/presenter_implementation";
import { UserUsecaseImplementation } from "../implementation/user_usecase_implementation";
import { User } from "@prisma/client";

export class CreateUserPresenter implements PresenterImp {
    
    constructor(
        private readonly createUserUsecase: UserUsecaseImplementation<User>
    ) {}

    async handle(req: Request, res: Response): Promise<any> {
        try {
            const {
                firstName,
                lastName,
                documentNumber
            } = req.body;

            const input = {
                firstName,
                lastName,
                documentNumber
            };

            const {
                data, 
                success, 
                statusCode, 
                message
            } = await this.createUserUsecase.execute(input);
            
            if (statusCode === 201 && success) { 
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