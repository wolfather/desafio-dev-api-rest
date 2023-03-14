
import { DbConnect } from "./db.infra";
import { AccountInfraImp } from "./account_infra_implementation";
import { Account } from "@prisma/client";

export class AccountInfra extends DbConnect implements AccountInfraImp {
    constructor() {
        super();
    }

    async getAccount(input: string): Promise<Account> {
        const account = await this.prisma.account.findUnique({
            where: {accountNumber: input},
            select: {
                accountNumber: true,
            }
        }) as Account;

        return account;
    }
    
    async getAccounts(input: string): Promise<Account[]> {
        const listUsers = (await this.prisma.account.findMany({
            where: { accountNumber: input }
        }));

        return listUsers;
    }

    async updateAccount(input: Partial<Account>): Promise<Partial<Account>> {
        const {
            accountNumber,
            agency
        } = input;

        const account = await this.prisma.account.update({
            where: {accountNumber},
            data: {
                agency,
            },
            select: {
                agency: true,
                accountNumber: true
            }
        });

        return account;
    }

    async deleteAccount(input: string): Promise<Partial<Account>> {
        const account = await this.prisma.account.delete({
            where: {accountNumber: input},
            select: { createdAt: true }
        });

        return account;
    }

    async createAccount(input: Partial<Account>): Promise<Partial<Account>> {
        const { accountNumber } = input;

        const accountExist = await this.prisma.account.findUnique({
            where: {accountNumber}
        });
        
        if(accountExist) {
            throw new Error('account already exist');
        } else {
            const account = await this.prisma.account.create({
                data: {
                    accountNumber,
                },
                select: {
                    accountNumber: true,
                    createdAt: false
                }
            });

            console.log("created", {account})
            
            return account;
        }
    }
}