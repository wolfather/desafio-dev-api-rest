import { User } from "@prisma/client";

export abstract class UserInfraImp {
    abstract createUser: (input: Partial<User>) => Promise<Partial<User>>;
    abstract getUser: (input: string) => Promise<User>;
    abstract getUsers: (input: string) => Promise<User[]>;
    abstract updateUser: (input: Partial<User>) => Promise<Partial<User>>;
    abstract deleteUser: (input: string) => Promise<Partial<User>>;
}