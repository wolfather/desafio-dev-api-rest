import { User } from "@prisma/client";
import { UserInfraImp } from "../../infra/user_infra_implementation";
import { 
    ExecuteImplementation, 
    UserUsecaseImplementation 
} from "../implementation/user_usecase_implementation";
import { documentNumberValidation } from "../validation/documentnumber";

export class UpdateUserUsecase implements UserUsecaseImplementation<User> {

    constructor(private readonly db: UserInfraImp) {}

    async execute(input: User): Promise<Partial<ExecuteImplementation>> {
        console.log("update validation", input, documentNumberValidation(input.documentNumber))
        try {
            if(documentNumberValidation(input.documentNumber)) {
                const result = await this.db.updateUser(input);

                console.log({result})

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
