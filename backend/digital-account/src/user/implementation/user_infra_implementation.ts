import { UserEntity } from "../entity/user";

export abstract class UserInfraImp {
    abstract createUser: (input: Partial<UserEntity>) => Promise<Partial<UserEntity>>;
    abstract getUser: (input: string) => Promise<Partial<UserEntity>>;
    abstract getUsers: (input: unknown) => Promise<UserEntity[]>;
    abstract updateUser: (input: Partial<UserEntity>) => Promise<Partial<UserEntity>>;
    abstract deleteUser: (input: string) => Promise<Partial<UserEntity>>;
}