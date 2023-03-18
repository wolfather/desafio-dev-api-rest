
import { User } from "@prisma/client";
import { cpf } from 'cpf-cnpj-validator';
import { UserInfraImp } from '../../../src/infra/user_infra_implementation';
import { GetUserUsecaseImplementation } from '../../../src/user/implementation/user_usecase_implementation';
import { GetUserUsecase } from '../../../src/user/domain/get_user'
import { DbConnect } from "../../../src/infra/db.infra";

class MockUserInfra extends DbConnect implements UserInfraImp {
    createUser: (input: Partial<User>) => Promise<Partial<User>>;
    getUser: (input: string) => Promise<Partial<User>>;
    getUsers: (input: string) => Promise<(User | undefined)[]>;
    updateUser: (input: Partial<User>) => Promise<Partial<User>>;
    deleteUser: (input: string) => Promise<Partial<User>>;
}

const mockDocumentNumber = cpf.generate();

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
        
    });

    it('should test usecase to be defined', () => {
        expect(usecase).toBeTruthy()
        expect(usecase.execute).toBeDefined();
    });

    describe('execute()', () => {
        it('should call getUser from db', async() => {
            spyDbGetUser = jest.spyOn(database, 'getUser');
            spyDbGetUser.mockResolvedValue(mockUser);
            const input = mockDocumentNumber;
            const result = await usecase.execute(input);
            
            expect(result?.data as Partial<User>).toBeDefined();
            
            expect(result?.data).toHaveProperty('firstName')
            expect(result?.data).toHaveProperty('lastName')
            expect(result?.data).toHaveProperty('id')

            expect(result.data?.firstName).toEqual('John');
            expect(result.statusCode).toEqual(200);
            expect(spyDbGetUser).toHaveBeenNthCalledWith(1, input);

            spyDbGetUser.mockClear();
        });
            
        it('should return code invalid credentials when no input been passed as argument', async() => {
            const result = await usecase.execute('');

            expect(result?.statusCode).toEqual(401);
            expect(spyDbGetUser).not.toBeCalled();
        });
    
        it('should call getUsersList with no data', async() => {
            jest.restoreAllMocks();
            spyDbGetUser = jest.spyOn(database, 'getUser');
            spyDbGetUser.mockResolvedValue([]);

            const input = '2111';
            const result = await usecase.execute('1');

            expect(result.statusCode).toBe(401);
            expect(spyDbGetUser).toHaveBeenNthCalledWith(1, input);
        });        
    });
});