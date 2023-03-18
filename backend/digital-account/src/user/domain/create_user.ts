import { UserInfraImp } from "../../infra/user_infra_implementation";
import { ExecuteImplementation, UserUsecaseImplementation } from "../implementation/user_usecase_implementation";
import { User } from "@prisma/client";
import { documentNumberValidation } from "../validation/documentnumber";

export class CreateUserUsecase implements UserUsecaseImplementation<User> {

    constructor(private readonly db: UserInfraImp) {}

    async execute(input: Partial<User>): Promise<Partial<ExecuteImplementation>> {
        try {
            if(
                input.firstName?.trim() && 
                input.lastName?.trim() && 
                documentNumberValidation(input.documentNumber!)
            ) {
                const result = await this.db.createUser(input);

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