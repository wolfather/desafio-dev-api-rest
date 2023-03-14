import { Account } from "@prisma/client";
import { UserInfraImp } from "../../infra/user_infra_implementation";
import { ExecuteImplementation, AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";


export class GetAccountUsecase implements AccountUsecaseImplementation<Account> {

    constructor(private readonly db: UserInfraImp) {}

    async execute(input: Account): Promise<Partial<ExecuteImplementation>> {
        try {
            if(input.accountNumber) {
                const result = await this.db.getUser(input.accountNumber);

                return result?.documentNumber ?
                    {
                        success: true,
                        data: result,
                        statusCode: 200,
                    } :
                    {
                        success: false,
                        statusCode: 400,
                        message: 'Not found',
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
