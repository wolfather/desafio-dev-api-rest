import { Request, Response } from "express";
import { PresenterImp } from "../implementation/presenter_implementation";
import { AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";
import { Account } from "@prisma/client";

export class GetAccountPresenter implements PresenterImp {
    
    constructor(
        private readonly getAccountUsecase: AccountUsecaseImplementation<Account>
    ) {}

    async handle(req: Request, res: Response): Promise<any> {
        try {
            const { documentNumber, accountNumber } = req.body;
            const input = {
                documentNumber, 
                accountNumber
            };

            const {
                data, 
                success, 
                statusCode, 
                message
            } = await this.getAccountUsecase.execute(input);
            
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