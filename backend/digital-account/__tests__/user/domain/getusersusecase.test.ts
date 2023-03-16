import { GetUsersUseCase } from "../../../src/user/domain/getusersusecase";
import { UseCaseImp } from "../../../src/implementation/usecase.imp";
import { UserEntity } from "../../../src/user/entity/user.entity";
import { mockValidUser } from "../../__mock__/user.mock";
import { MockDbImp } from "../implementation/mockdb";
import { ERROR_CODE } from "../../../src/utils/factory/errorresponsefactory";
import { UserDBImp } from "../../../src/user/implementation/db.imp";

const usersList = mockValidUser(4) as UserEntity[];

describe('HomeUseCase', () => {
    let database: UserDBImp;
    let usecase: UseCaseImp<UserEntity>;
    let spyDbGetUser: any;
    
    beforeEach(async() => {
        database = new MockDbImp();
        usecase = new GetUsersUseCase(database);
        spyDbGetUser = jest.spyOn(database, 'getUsers');
    });

    afterEach(async() => {
        spyDbGetUser.mockClear().mockReset().mockRestore();
    });

    it('should test usecase to be defined', () => {
        expect(usecase).toBeTruthy()
        expect(usecase.execute).toBeDefined()
    });

    describe('execute()', () => {
        it('should call getUsersList from db', async() => {
            spyDbGetUser.mockResolvedValue(usersList);
            const input = '1';
            const result = await usecase.execute('1');
            
            expect((result?.data as UserEntity[]).length).toBeGreaterThan(0);
            
            (result?.data as UserEntity[])
                .map((result: UserEntity, index: number) => {
                    expect(result).toHaveProperty('name')
                    expect(result).toHaveProperty('email')
                    expect(result).toHaveProperty('id')

                    expect(result)
                        .toEqual(
                            expect.objectContaining(usersList[index])
                        );
                });
            
            expect(spyDbGetUser).toHaveBeenNthCalledWith(1, input);
        });

        it('should return code invalid credentials when no input been passed as argument', async() => {
            const result = await usecase.execute();

            expect(result).toEqual({code: ERROR_CODE.INVALID_CREDENTIALS});
            expect(spyDbGetUser).not.toBeCalled();
        });

        it('should call getUsersList with no data', async() => {
            spyDbGetUser.mockResolvedValue([]);
            const input = '1';
            const result = await usecase.execute('1');

            expect(result).toStrictEqual({
                code: ERROR_CODE.BAD_REQUEST
            });
            expect(spyDbGetUser).toHaveBeenNthCalledWith(1, input);
        });        
    });
});