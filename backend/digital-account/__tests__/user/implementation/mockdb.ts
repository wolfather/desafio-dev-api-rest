import { AuthCredentialsEntity } from "../../../src/authentication/entity/authcredentials.entity";
import { UserEntity } from "../../../src/user/entity/user.entity";
import { UserDBImp } from "../../../src/user/implementation/db.imp";

export class MockDbImp implements Partial<UserDBImp>{
	constructor() {}
	async connect(): Promise<void> {
        return Promise.resolve();
    };
    async disconnect(): Promise<void> {
        return Promise.resolve();
    }
    
    async getUsers(input?: unknown): Promise<UserEntity[]> {
		return Promise.resolve([] as UserEntity[]);
	}
    async createUser(input: Partial<UserEntity>): Promise<UserEntity> {
        return Promise.resolve({} as UserEntity);
    }
    async getUser(input: string): Promise<UserEntity> {
        return Promise.resolve({} as UserEntity);
    }
    async updateUser (input: Partial<UserEntity>): Promise<UserEntity> {
        return Promise.resolve({} as UserEntity);
    }
    async deleteUser(input: string): Promise<UserEntity> {
        return Promise.resolve({} as UserEntity);
    }
    
    async authenticateUser(input: AuthCredentialsEntity): Promise<UserEntity> {
        return Promise.resolve({} as UserEntity);
    }
}