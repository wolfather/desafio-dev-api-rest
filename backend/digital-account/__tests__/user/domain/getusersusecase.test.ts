
import { User } from "@prisma/client";
import { cpf } from 'cpf-cnpj-validator';
import { UserInfraImp } from '../../../src/infra/user_infra_implementation';
import { UserInfra } from '../../../src/infra/user_infra'
import { GetUserUsecaseImplementation } from '../../../src/user/implementation/user_usecase_implementation';
import { GetUserUsecase } from '../../../src/user/domain/get_user'


class MockUserInfra implements UserInfraImp {
    createUser: (input: Partial<User>) => Promise<Partial<User>>;
    getUser: (input: string) => Promise<Partial<User>>;
    getUsers: (input: string) => Promise<(User | undefined)[]>;
    updateUser: (input: Partial<User>) => Promise<Partial<User>>;
    deleteUser: (input: string) => Promise<Partial<User>>;
}

const mockDocumentNumber = cpf.generate();
console.log({mockDocumentNumber})
const mockUser: Partial<User> = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    documentNumber: mockDocumentNumber,
};

describe('GetUserUseCase', () => {
    let database: UserInfraImp;
    let usecase: GetUserUsecaseImplementation;
    let spyDbGetUser: any;
    
    beforeEach(async() => {
        database = new MockUserInfra();
        usecase = new GetUserUsecase(database);
        spyDbGetUser = jest.spyOn(database, 'getUser');
    });

    // afterEach(async() => {
    //     spyDbGetUser
    //         //.mockClear()
    //         .mockReset()
    //         .mockRestore();
    // });

    it('should test usecase to be defined', () => {
        expect(usecase).toBeTruthy()
        expect(usecase.execute).toBeDefined()
    });

    describe('execute()', () => {
        it('should call getUser from db', async() => {
            spyDbGetUser.mockResolvedValue(mockUser);
            const input = mockDocumentNumber;
            const result = await usecase.execute(input);
            
            expect(result?.data as Partial<User>).toBeDefined();
            
            expect(result?.data).toHaveProperty('firstName')
            expect(result?.data).toHaveProperty('lastName')
            expect(result?.data).toHaveProperty('id')

            expect(result.data?.firstName).toEqual('John');
            expect(spyDbGetUser).toHaveBeenNthCalledWith(1, input);
        });
            
        it('should return code invalid credentials when no input been passed as argument', async() => {
            const result = await usecase.execute('');

            expect(result?.statusCode).toEqual(401);
            expect(spyDbGetUser).not.toBeCalled();
        });
    });

    //     it('should call getUsersList with no data', async() => {
    //         spyDbGetUser.mockResolvedValue([]);
    //         const input = '1';
    //         const result = await usecase.execute('1');

    //         expect(result).toStrictEqual({
    //             code: ERROR_CODE.BAD_REQUEST
    //         });
    //         expect(spyDbGetUser).toHaveBeenNthCalledWith(1, input);
    //     });        
    // });
});