import { UserInfraImp } from "../../infra/user_infra_implementation";
import { ExecuteImplementation, UserUsecaseImplementation } from "../implementation/user_usecase_implementation";
import { documentNumberValidation } from "../validation/documentnumber";

export class GetUserUsecase implements UserUsecaseImplementation<string> {

    constructor(private readonly db: UserInfraImp) {}

    async execute(input: string): Promise<Partial<ExecuteImplementation>> {
        console.log("getuser validation", input, documentNumberValidation(input))
        try {
            if(documentNumberValidation(input)) {
                const result = await this.db.getUser(input);

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
