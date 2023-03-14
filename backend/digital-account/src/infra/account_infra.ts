
import { DbConnect } from "./db.infra";
import { AccountInfraImp } from "./account_infra_implementation";
import { Account } from "@prisma/client";

export class AccountInfra extends DbConnect implements AccountInfraImp {
    constructor() {
        super();
    }

    async getAccount(input: number): Promise<Account> {
        const account = await this.prisma.account.findUnique({
            where: {accountNumber: input},
            select: {
                accountNumber: true,
            }
        }) as Account;

        return account;
    }
    
    async getUsers(input: string): Promise<User[]> {
        const listUsers = (await this.prisma.user.findMany({
            where: { documentNumber: input }
        }));

        return listUsers;
    }

    async updateUser(input: Partial<User>): Promise<Partial<User>> {
        const {
            firstName,
            lastName,
            documentNumber,
        } = input;

        const user = await this.prisma.user.update({
            where: {documentNumber},
            data: {
                firstName,
                lastName
            },
            select: {
                firstName: true,
                lastName: true,
                documentNumber: true
            }
        });

        return user;
    }

    async deleteUser(input: string): Promise<Partial<User>> {
        const user = await this.prisma.user.delete({
            where: {documentNumber: input},
            select: { createdAt: true }
        });

        return user;
    }

    async createUser(input: Partial<User>): Promise<Partial<User>> {
        const { documentNumber } = input;

        const userExist = await this.prisma.user.findUnique({
            where: {documentNumber}
        });
        
        if(userExist) {
            throw new Error('user already exist');
        } else {
            const user = await this.prisma.user.create({
                data: {
                    documentNumber: input.documentNumber!,
                    firstName: input.firstName!,
                    lastName: input.lastName!
                },
                select: {
                    firstName: true,
                    lastName: true,
                    documentNumber: true,
                    createdAt: false
                }
            });

            console.log("created", {user})
            
            return user;
        }
    }
}