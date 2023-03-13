
import { DbInfra } from "./db.infra";
import { UserEntity } from "../user/entity/user";
import { UserInfraImp } from "../user/implementation/user_infra_implementation";


export class UserInfra extends DbInfra implements UserInfraImp {
    constructor() {
        super();
    }

    async getUser(input: string): Promise<Partial<UserEntity>> {
        const user = await this.prisma.users.findUnique({
            where: {id: input},
            select: {
                id: true,
                name: true,
                email: true,
            }
        }) as Partial<UserEntity>;

        return user;
    }
    
    async getUsers(input: unknown): Promise<UserEntity[]> {
        const listUsers = (await this.prisma.users.findMany({
            select: {
                name: true, 
                email: true, 
                id: true,
            }
        })) as Partial<UserEntity[]>;

        return listUsers as UserEntity[];
    }

    async updateUser(input: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        const {
            firstName,
            lastName,
            documentNumber,
        } = input;

        const user = await this.prisma.users.update({
            where: {documentNumber},
            data: {
                firstName,
                lastName, 
                documentNumber,
            },
            select: {
                firstName: true,
                lastName: true,
                documentNumber: true,
            }
        });

        return user as Partial<UserEntity>;
    }

    async deleteUser(input: string): Promise<Partial<UserEntity>> {
        const user = await this.prisma.users.delete({
            where: {id: input},
            select: {
                createdAt: true
            }
        })  as Partial<UserEntity>;

        return user;
    }

    async createUser(input: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        const {
            password, 
            documentNumber,
            phoneNumber,
            floor,
            number,
            parkPlace
        } = input;

        const userExist = await this.prisma.users.findFirst({
            where: {documentNumber},
            select: {createdAt: true}
        });

        if(userExist) {
            return userExist;
        }

        const user = await this.prisma.users.create({
            data: {
                email: input.email!, 
                password, 
                name: input.name!,
                documentNumber: input.documentNumber!,
                phoneNumber,
                floor,
                number,
                parkPlace
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        }) as Partial<UserEntity>;
        
        return user;
    }
}