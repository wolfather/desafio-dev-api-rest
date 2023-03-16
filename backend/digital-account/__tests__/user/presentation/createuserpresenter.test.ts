import { CreateUserPresenter } from "../../../src/user/presentation/createuserpresenter";
import { CreateUserUseCase } from "../../../src/user/domain/createuserusecase";
import { HttpRequestAdapter, HttpResponseAdapter } from '../../../src/presentation/adapter/httpadapter.interface';
import { UseCaseImp } from "../../../src/implementation/usecase.imp";
import { PresenterImp } from "../../../src/implementation/presenter.imp";
import { MockDbImp } from "../implementation/mockdb";
import { ERROR_CODE, ERROR_MESSAGE, ERROR_NUM } from "../../../src/utils/factory/errorresponsefactory";
import { UserDBImp } from "../../../src/user/implementation/db.imp";
import { UserEntity } from "../../../src/user/entity/user.entity";
const mockCreateUser = () => {
    const userStub = {
        //id: uuid(),
        //createdAt: new Date().getTime().toString(),
        //token: uuid(),
        email: `valid-0@mail.com`,
        password: 'i'.repeat(6),
        name: 'valid user',
        documentNumber: '11122233344',
        phoneNumber: '11999998888',
        floor: '12',
        number: `1A`,
        parkPlace: `a121`,
    };

    let req = {
        query: {} as HttpRequestAdapter['query'],
        body: userStub as HttpRequestAdapter['body']
    } as HttpRequestAdapter;

    return { req, 
        userStub, 
        userStubInvalidEmail: {...userStub, email: 'invalid.mail.co'}, 
        userStubNoEmail: {...userStub, email: ''}, 
        userStubNoName: {...userStub, name: ''}, 
        userStubNoPassword: {...userStub, password: ''},
    };
};

describe('CreateUserPresenter', () => {
    let db: UserDBImp;
    let usecase: UseCaseImp<UserEntity>;
    let presenter: PresenterImp<Partial<HttpResponseAdapter<UseCaseImp<UserEntity>>>>;
    let spyUseCaseExecute: any;

    beforeEach(async() => {
        db = new MockDbImp();
        usecase = new CreateUserUseCase(db);
        presenter = new CreateUserPresenter(usecase);
        spyUseCaseExecute = jest.spyOn(usecase, 'execute')
    });
    
    afterEach(async() => {
        spyUseCaseExecute.mockClear().mockReset().mockRestore();
    });
    
    it('should assert class and handle method', () => {
        expect(presenter).toBeInstanceOf(CreateUserPresenter)
        expect(presenter.handle).toBeDefined()
    });
    
    it('should call the usecase on handle() when valid arguments were provided', async() => {
        const {req, userStub} = mockCreateUser();
        //const newUser = mockValidUser(1) as User;
        const userCreated = {
            ...userStub,
            createdAt: new Date().getTime().toString()
        };

        spyUseCaseExecute.mockResolvedValue({
            success: true,
            data: userCreated,
            code: ERROR_CODE.OK
        });
        let _req = {...req, body: userStub};

        const {data} = await presenter.handle(_req);

        expect((data as UserEntity).name).toEqual(userStub.name);
        //expect(statusCode).toBe(ERROR_NUM.OK);
        expect(spyUseCaseExecute).toHaveBeenNthCalledWith(1, userStub);
    });
    
    it('should call the usecase on handle with invalid password', async() => {
        const {req, userStubNoPassword} = mockCreateUser();

        spyUseCaseExecute.mockResolvedValue({
            statusCode: ERROR_CODE.BAD_REQUEST,
        })
        let _req = {...req, body: userStubNoPassword};

        const {message, statusCode} = await presenter.handle(_req);

        expect(message).toEqual(ERROR_MESSAGE.BAD_REQUEST);
        expect(statusCode).toBe(ERROR_NUM.BAD_REQUEST);
        expect(spyUseCaseExecute).not.toHaveBeenCalled();
    });

    it('should call the usecase on handle with invalid email', async() => {
        const {req, userStubInvalidEmail} = mockCreateUser();

        spyUseCaseExecute.mockResolvedValue({
            code: ERROR_CODE.INVALID_CREDENTIALS
        })
        let _req = {...req, body: userStubInvalidEmail};
        
        const {message, statusCode} = await presenter.handle(_req);

        expect(message).toEqual(ERROR_MESSAGE.INVALID_CREDENTIALS);
        expect(statusCode).toBe(ERROR_NUM.INVALID_CREDENTIALS);
        expect(spyUseCaseExecute).toHaveBeenCalled();
    });
    
    it('should throw error without parameters trying to create user', async() => {
        const {req} = mockCreateUser();

        spyUseCaseExecute.mockRejectedValue({
            code: 500
        })
        let _req = {
            params: req.params,
            query: req.query
        };
        
        const {message, statusCode} = await presenter.handle(_req);

        expect(message).toEqual(ERROR_MESSAGE.SERVER);
        expect(statusCode).toBe(ERROR_NUM.SERVER);
        expect(spyUseCaseExecute).not.toHaveBeenCalled();
    });
});
