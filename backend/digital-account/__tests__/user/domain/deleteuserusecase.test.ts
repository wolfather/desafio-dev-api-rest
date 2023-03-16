import { UserEntity } from "../../../src/user/entity/user.entity";
import { UseCaseImp } from "../../../src/implementation/usecase.imp";
import { DeleteUserUseCase } from "../../../src/user/domain/deleteuserusecase";
import { mockValidUser } from "../../__mock__/user.mock";
import { MockDbImp } from "../implementation/mockdb";
import { ERROR_CODE } from "../../../src/utils/factory/errorresponsefactory";
import { UserDBImp } from "../../../src/user/implementation/db.imp";

describe('DeleteUserUseCase', () => {
    let db: UserDBImp;
    let usecase: UseCaseImp<UserEntity>;
    let spyDbDeleteUser: any;
    let mockUsersInMemory: UserEntity[];

    beforeEach(async() => {
        mockUsersInMemory = mockValidUser(3) as UserEntity[];
        db = new MockDbImp();
        usecase = new DeleteUserUseCase(db);
        spyDbDeleteUser = jest.spyOn(db, 'deleteUser');
    });

    afterEach(async() => {
        spyDbDeleteUser.mockClear().mockReset().mockRestore();
    });

    it('should assert instance and execute method', () => {
        expect(usecase).toBeInstanceOf(DeleteUserUseCase);
        expect(usecase.execute).toBeDefined();
    });

    it('should assert the successfuly return on db', async() => {
        const lastUser = mockUsersInMemory[mockUsersInMemory.length - 1];

        spyDbDeleteUser.mockResolvedValue(lastUser);
        const input = lastUser.id;
        const {success, data, code} = await usecase.execute(input);
        mockUsersInMemory.pop();

        expect(success).toBeTruthy();
        expect(data).toEqual({createdAt: lastUser.createdAt});
        expect(code).toEqual(ERROR_CODE.OK);
        expect(spyDbDeleteUser).toHaveBeenNthCalledWith(1, input);
        mockUsersInMemory.forEach(user => {
            expect(user.id).not.toEqual(lastUser.id);
        });
    });

    it('should assert the failure without input parameter', async() => {
        spyDbDeleteUser.mockRejectedValue({})

        const {code} = await usecase.execute();

        expect(code).toBe(ERROR_CODE.INVALID_CREDENTIALS);
        expect(spyDbDeleteUser).not.toHaveBeenCalled();
    });

    it('should throws', async() => {
        spyDbDeleteUser.mockImplementation(() => {
            throw new Error('')
        });
        
        const {code} = await usecase.execute('1');
        expect(code).toBe(ERROR_CODE.SERVER);
        expect(spyDbDeleteUser).toBeCalled();
    });
})
