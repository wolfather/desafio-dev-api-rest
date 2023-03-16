import { CreateUserUseCase } from "../../../src/user/domain/createuserusecase";
import { UseCaseImp } from "../../../src/implementation/usecase.imp";
import { UserEntity } from "../../../src/user/entity/user.entity";
import { mockValidUser } from "../../__mock__/user.mock";
import { checkIncluded } from "../../utils/checkincluded";
import { MockDbImp } from "../implementation/mockdb";
import { ERROR_CODE } from "../../../src/utils/factory/errorresponsefactory";
import { UserDBImp } from "../../../src/user/implementation/db.imp";

describe('CreateUserUseCase', () => {
    let db: UserDBImp;
    let usecase: UseCaseImp<UserEntity>;
    let spyDbCreateUser: any;

    let usersInMemory: any;

    let mockDbCreateUserUsecase: any;
    
    beforeEach(async() => {
        usersInMemory = mockValidUser(3) as UserEntity[];
        mockDbCreateUserUsecase = () => {
            return {
                existingEmailUser: usersInMemory[0],
                emptyEmailUser: {...usersInMemory[0], email: ''} as UserEntity,
                invalidEmailUser: {...usersInMemory[0], email: 'invalid.com'} as UserEntity,
                invalidNameUser: {...usersInMemory[0], name: ''} as UserEntity,
                invalidPasswordUser: {...usersInMemory[0], password: ''} as UserEntity,
            };
        };

        db = new MockDbImp();
        usecase = new CreateUserUseCase(db);
        spyDbCreateUser = jest.spyOn(db, 'createUser');
    });

    afterEach(async() => {
        spyDbCreateUser.mockClear().mockReset().mockRestore();
    });

    it('should assert the instance and execute method', () => {
        expect(usecase).toBeInstanceOf(CreateUserUseCase);
        expect(usecase.execute).toBeDefined();
    });

    it('should create the user successfuly with right user data provided', async() => {
        const newValidUser = {
            name: 'new valid name',
            email: 'new_valid@mail.com',
            password: '123456',
            documentNumber: '11122233344',
            phoneNumber: '11999998888',
            floor: '12',
            number: '121A',
            parkPlace: 'a12',
        };
        const input: Partial<UserEntity> = newValidUser;
        
        spyDbCreateUser.mockImplementation(() => (
            checkIncluded(usersInMemory, input).length ?
                {createdAt: '2022-12-31T01:38:11.899Z'} :
                {...input, id: 'newUserValidId'}
        ));
        
        const {success, data, code} = await usecase.execute(input);
        
        expect(success).toBeTruthy();
        expect(data).toHaveProperty('id');
        expect(code).toBe(ERROR_CODE.OK);
        expect(spyDbCreateUser).toHaveBeenCalledTimes(1);
    });
    
    it('should not create the user with an existing email', async() => {
        const input = {
            name: usersInMemory[0].name,
            email: usersInMemory[0].email,
            password: usersInMemory[0].password,
            documentNumber: usersInMemory[0].documentNumber,
            phoneNumber: usersInMemory[0].phoneNumber,
            floor: usersInMemory[0].floor,
            number: usersInMemory[0].number,
            parkPlace: usersInMemory[0].parkPlace,
        };

        spyDbCreateUser.mockImplementation(() => {
            return checkIncluded(usersInMemory, input).length ?
                {createdAt: '2022-12-31T01:38:11.899Z'} :
                {...input, id: 'newUserValidId'}
        });

        const {code} = await usecase.execute(input);

        expect(code).toBe(ERROR_CODE.BAD_REQUEST);
        expect(spyDbCreateUser).toHaveBeenCalledTimes(1);
    });

    it('should not create the user with empty email parameter', async() => {
        const {emptyEmailUser} = mockDbCreateUserUsecase();

        const input = emptyEmailUser;
        const {code} = await usecase.execute(input);

        expect(code).toBe(ERROR_CODE.INVALID_CREDENTIALS);
        expect(spyDbCreateUser).not.toHaveBeenCalled();
    });

    it('should not create the user with invalid email parameter', async() => {
        const {invalidEmailUser} = mockDbCreateUserUsecase();

        const input = invalidEmailUser;
        const {code} = await usecase.execute(input);

        expect(code).toBe(ERROR_CODE.INVALID_CREDENTIALS);
        expect(spyDbCreateUser).not.toHaveBeenCalled();
        //expect(spyHash).not.toHaveBeenCalled();
    });

    it('should not create the user with invalid name parameter', async() => {
        const {invalidNameUser} = mockDbCreateUserUsecase();

        const input = invalidNameUser;
        const {code} = await usecase.execute(input);

        expect(code).toBe(ERROR_CODE.INVALID_CREDENTIALS)
        expect(spyDbCreateUser).not.toHaveBeenCalled();
    });

    it('should not create the user with invalid password parameter', async() => {
        const {invalidPasswordUser} = mockDbCreateUserUsecase();

        const input = invalidPasswordUser;
        const {code} = await usecase.execute(input);

        expect(code).toEqual(ERROR_CODE.INVALID_CREDENTIALS);
        expect(spyDbCreateUser).not.toHaveBeenCalled();
    });
});
