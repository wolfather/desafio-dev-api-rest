import { ExecuteImplementation, AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";
import { Account } from "@prisma/client";
import { documentNumberValidation } from "../validation/documentnumber";
import { AccountInfraImp } from "../../infra/account_infra_implementation";
import * as uuid from 'uuid';
import { accountValidation } from "../validation/account";

export class CreateAccountUsecase implements AccountUsecaseImplementation<Account> {

    constructor(private readonly db: AccountInfraImp) {}

    async execute(input: Partial<Account>): Promise<Partial<ExecuteImplementation<Account>>> {
        try {
            const accountObjectValidation = {
                agency: input.agency,
                number: input.number,
                blocked: input.blocked,
                balance: input.balance
            };

            if(accountValidation(accountObjectValidation) && documentNumberValidation(input.documentNumber!)) {
                const newAccount: Partial<Account> = {
                    ...input,
                    accountNumber: uuid.v4(),
                };
                const result = await this.db.createAccount(newAccount);

                return result.createdAt ?
                    {
                        success: false,
                        statusCode: 400,
                        message: 'Already exists',
                    } : 
                    {
                        success: true,
                        data: result,
                        statusCode: 201,
                    };
            } else {
                return {
                    success: false,
                    statusCode: 401,
                    message: 'Invalid data',
                };
            }

        } catch(err) {
            return {
                statusCode: 500,
                message: 'Server Error',
                success: false
            };
        }
    }
}