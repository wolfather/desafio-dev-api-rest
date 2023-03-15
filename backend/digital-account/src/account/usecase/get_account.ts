import { Account } from "@prisma/client";
import { UserInfraImp } from "../../infra/user_infra_implementation";
import { ExecuteImplementation, AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";
import { AccountInfraImp } from "../../infra/account_infra_implementation";
import { documentNumberValidation } from "../validation/documentnumber";


export class GetAccountUsecase implements AccountUsecaseImplementation<Account> {

    constructor(private readonly db: AccountInfraImp) {}

    async execute(input: Partial<Account>): Promise<Partial<ExecuteImplementation>> {
        try {
            if(input.accountNumber && documentNumberValidation(input.documentNumber!)) {
                const result = await this.db.getAccount(input);
                console.log({result})
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
