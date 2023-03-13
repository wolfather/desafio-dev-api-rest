import { UserEntity } from "../entity/user";
import { prismaClient } from "../../prisma/client";
import { UserInfraImp } from "../implementation/user_infra_implementation";
import { ExecuteImp, UserUsecaseImpl } from "../implementation/user_usecase_implementation";


export class CreateUserUsecase implements UserUsecaseImpl<UserEntity> {

    constructor(private readonly db: UserInfraImp) {}

    async execute(input: Partial<UserEntity>): Promise<Partial<ExecuteImp>> {
        try {
            if(input) {
                //const result = await this.db.createUser(input);
                const result = await prismaClient.user.findFirst({
                    where: {documentNumber: input.documentNumber}
                });
                const _result = input;
                console.log({result})
                return _result.documentNumber ?
                    {
                        success: true,
                        data: result as UserEntity,
                        statusCode: 201
                    } :
                    {
                        success: false,
                        statusCode: 400,
                        message: 'Not found',
                    };
            }

            return {
                success: false,
                statusCode: 401,
                message: 'Invalid data',
            };
        } catch(err) {
            return {
                statusCode: 500,
                message: 'Server Error',
                success: false
            };
        }
    }
}