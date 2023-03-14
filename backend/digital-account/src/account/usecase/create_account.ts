import { UserInfraImp } from "../../infra/user_infra_implementation";
import { ExecuteImplementation, AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";
import { Account } from "@prisma/client";
import { documentNumberValidation } from "../validation/documentnumber";

export class CreateAccountUsecase implements AccountUsecaseImplementation<Account> {

    constructor(private readonly db: UserInfraImp) {}

    async execute(input: Partial<Account>): Promise<Partial<ExecuteImplementation>> {
        try {
            if(
                input.accountNumber!
            ) {
                const result = await this.db.createUser(input);

                return result.createdAt ?
                    {
                        success: false,
                        statusCode: 400,
                        message: 'Already exist',
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
            console.log({err})
            return {
                statusCode: 500,
                message: 'Server Error',
                success: false
            };
        }
    }
}