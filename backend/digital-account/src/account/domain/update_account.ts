import { Account } from "@prisma/client";
import { ExecuteImplementation, AccountUsecaseImplementation } from "../implementation/account_usecase_implementation";
import { AccountInfraImp } from "../../infra/account_infra_implementation";
import { accountValidation } from "../validation/account";
import { documentNumberValidation } from "../validation/documentnumber";


export class UpdateAccountUsecase implements AccountUsecaseImplementation<Account> {

    constructor(private readonly db: AccountInfraImp) {}

    async execute(input: Partial<Account>): Promise<Partial<ExecuteImplementation<Account>>> {
        try {
            const accountExists = await this.db.getAccount(input);

            const updateDataToValidate = {
                balance: input.balance,
                agency: input.agency,
                number: input.number,
                blocked: input.blocked
            };
            console.log(accountValidation(updateDataToValidate))
            console.log({accountExists})
            if(
                accountExists &&
                accountValidation(updateDataToValidate) && 
                documentNumberValidation(input.documentNumber!)
            ) {
                const newBalanceValue = (input.withdraw! <= (accountExists.balance -1)) ? accountExists.balance - input.balance! : accountExists.balance;
                console.log({newBalanceValue});
                const data = {
                    ...input, 
                    balance: newBalanceValue
                }
                const result = await this.db.updateAccount(data);

                return result?.updatedAt ?
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
