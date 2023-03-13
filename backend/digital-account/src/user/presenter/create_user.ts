import { HttpRequestAdapter, HttpResponseAdapter } from "../../adapter/httpadapter.interface";
import { PresenterImp } from "../../implementation/presenter_implementation";
import { UserEntity } from "../entity/user";
import { UserUsecaseImpl } from "../implementation/user_usecase_implementation";

export class CreateUserPresenter 
    implements PresenterImp<Partial<HttpResponseAdapter<UserUsecaseImpl<UserEntity>>>> {
    
    constructor(private readonly userUsecase: UserUsecaseImpl<UserEntity>) {}

    async handle(req: Partial<HttpRequestAdapter>): Promise<Partial<HttpResponseAdapter<UserUsecaseImpl<UserEntity>>>> {
        console.log("BDOY", req);
        try {
            const {
                firstName,
                lastName,
                documentNumber
            } = req.body;

            const input = {
                firstName,
                lastName,
                documentNumber
            };

            const {
                data, 
                success, 
                statusCode, 
                message
            } = await this.userUsecase.execute(input)
            
            if(statusCode === 200 && success) {
                return {
                    data,//: data as Partial<ExecuteImp>,
                    statusCode
                };
            } else {
                return {
                    statusCode, message
                }
            }
        } catch(err) {
            console.log(err)
            return  {
                statusCode: 500,
                message: 'Server error',
            };
        }
    }
}