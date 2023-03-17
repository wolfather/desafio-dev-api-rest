import { Request, Response } from "express";
import { PresenterImp } from "../implementation/presenter_implementation";
import { UserUsecaseImplementation } from "../implementation/user_usecase_implementation";
import { User } from "@prisma/client";

export class UpdateUserPresenter implements PresenterImp {
    
    constructor(
        private readonly udpateUserUsecase: UserUsecaseImplementation<User>
    ) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { documentNumber, firstName, lastName } = req.body;
            console.log('doc number:', documentNumber);
            const input = {documentNumber, firstName, lastName};

            const {
                data, 
                success, 
                statusCode, 
                message
            } = await this.udpateUserUsecase.execute(input);

            if (statusCode === 200 && success) {
                res.json({
                    data,
                    statusCode
                }).status(statusCode).send();
            } else {
                res.json({
                    statusCode, 
                    message
                }).status(statusCode!).send();
            }

        } catch(err) {
            console.log('err', {err});
            res.json({
                statusCode: 500,
                message: 'Server error',
            }).status(500).send();
        }
    }
}
