import { UserEntity } from "../../../src/user/entity/user.entity";
import { ExecuteImp, UseCaseImp } from "../../../src/implementation/usecase.imp";
import { PresenterImp } from "../../../src/implementation/presenter.imp";
import { DeleteUserPresenter } from "../../../src/user/presentation/deleteuserpresenter";
import { DeleteUserUseCase } from "../../../src/user/domain/deleteuserusecase";
import { HttpRequestAdapter, HttpResponseAdapter } from '../../../src/presentation/adapter/httpadapter.interface';
import { mockValidUser } from "../../__mock__/user.mock";
import { MockDbImp } from "../implementation/mockdb";
import { ERROR_CODE, ERROR_MESSAGE, ERROR_NUM } from "../../../src/utils/factory/errorresponsefactory";
import { UserDBImp } from "../../../src/user/implementation/db.imp";

const mockUsersInMemory = mockValidUser(3) as UserEntity[];

const mockDeleteUseCase = () => {
    let req: HttpRequestAdapter = {
        body: {id: mockUsersInMemory[0].id},
        query: {} as HttpRequestAdapter['query'],
        params: {} as HttpRequestAdapter['params'],
    };

    return {
        req,
        userToDelete: mockUsersInMemory[0]
    };
};

describe('DeletePresenter', () => {
    let db: UserDBImp;
    let usecase: UseCaseImp<UserEntity>;
    let presenter: PresenterImp<Partial<HttpResponseAdapter<UseCaseImp<UserEntity>>>>;

    let spyUseCaseExecute: any;

    beforeEach(async() => {
        db = new MockDbImp();
        usecase = new DeleteUserUseCase(db);
        presenter = new DeleteUserPresenter(usecase);
        spyUseCaseExecute = jest.spyOn(usecase, 'execute');
    });

    afterEach(async() => {
        spyUseCaseExecute.mockClear().mockReset().mockRestore();
    });

    it('should assert type and method', () => {
        expect(presenter).toBeInstanceOf(DeleteUserPresenter);
        expect(presenter.handle).toBeDefined();
    });

    it('should call usecase.execute on handle() returning user removed', async()=> {
        const {req} = mockDeleteUseCase();

        const input = req.body.id;

        spyUseCaseExecute.mockResolvedValue({
            success: true,
            data: mockUsersInMemory.filter(user => user.id !== input),
            code: ERROR_CODE.OK,
        });

        const result = await presenter.handle(req);
        
        //expect(statusCode).toBe(ERROR_NUM.OK);
        (result.data as UserEntity[]).forEach((d: UserEntity) => {
            expect(d.id).not.toEqual(input);
        });
        expect(spyUseCaseExecute).toHaveBeenNthCalledWith(1, input);
    });

    it('should call usecase.execute on handle() and returning bad request with invalid credential', async()=> {
        const {req} = mockDeleteUseCase();

        req.body = {...req.body, id: 'invalidID'};
        const input = req.body.id;

        spyUseCaseExecute.mockResolvedValue({
            code: ERROR_CODE.BAD_REQUEST,
        });

        const {message, statusCode} = await presenter.handle(req);
        
        expect(statusCode).toBe(ERROR_NUM.BAD_REQUEST);
        expect(message).toBe(ERROR_MESSAGE.BAD_REQUEST)
        expect(spyUseCaseExecute).toHaveBeenNthCalledWith(1, input);
    });

    it('should call usecase.execute on handle() and returning bad request without id value', async()=> {
        const {req} = mockDeleteUseCase();

        req.body = {...req.body, id: ''};
        const input = req.body.id;

        spyUseCaseExecute.mockResolvedValue({
            code: ERROR_CODE.BAD_REQUEST,
        });

        const {message, statusCode} = await presenter.handle(req);
        
        expect(statusCode).toBe(ERROR_NUM.BAD_REQUEST);
        expect(message).toBe(ERROR_MESSAGE.BAD_REQUEST)
        expect(spyUseCaseExecute).not.toBeCalled();
    });

    it('should return error when no parameter were provided, and no call the usecase.execute()', async() => {
        const {req} = mockDeleteUseCase()
        let _req = ({} as any) as HttpRequestAdapter;
        
        const {message, statusCode} = await presenter.handle(_req);

        expect(message).toEqual(ERROR_MESSAGE.SERVER);
        expect(statusCode).toBe(ERROR_NUM.SERVER)
        expect(spyUseCaseExecute).not.toBeCalled();
    });
});
