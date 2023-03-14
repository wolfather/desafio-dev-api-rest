import { Request, Response } from "express";
import { PresenterImp } from "../implementation/presenter_implementation";
import { AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";
import { Account } from "@prisma/client";

export class CreateAccountPresenter implements PresenterImp {
    
    constructor(
        private readonly createUserUsecase: AccountUsecaseImplementation<Account>
    ) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const {
                documentNumber,
                accountNumber,
            } = req.body;

            const input = {
                documentNumber,
                accountNumber
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
                }).status(statusCode).send();
            } else {
                res.json({
                    statusCode, 
                    message
                }).status(statusCode!).send();
            }

        } catch(err) {
            res.json({
                statusCode: 500,
                message: 'Server error',
            }).status(500).send();
        }
    }
}