
import { DbConnect } from "./db.infra";
import { AccountInfraImp } from "./account_infra_implementation";
import { Account } from "@prisma/client";

export class AccountInfra extends DbConnect implements AccountInfraImp {
    constructor() {
        super();
    }

    async getAccount(input: Partial<Account>): Promise<Account> {
        const {documentNumber} = input;

        const account = await this.prisma.account.findFirst({
            where: {
                documentNumber
            },
            select: {
                accountNumber: true,
                documentNumber: true,
                balance: true,
                agency: true,
                number: true,
                blocked: true,
                createdAt: false,
                updatedAt: false,
            }
        }) as Account;

        return account;
    }
    
    async getAccounts(input: Partial<Account>): Promise<Account[]> {
        const listAccounts = (await this.prisma.account.findMany({
            where: { documentNumber: input.documentNumber }
        }));

        return listAccounts;
    }

    async updateAccount(input: Partial<Account>): Promise<Partial<Account>> {
        const {
            accountNumber,
            balance,
            blocked,
            documentNumber,
        } = input;

        const account = await this.prisma.account.update({
            where: {accountNumber},
            data: {
                balance,
                blocked,
                documentNumber,
            },
            select: {
                agency: true,
                number: true,
                accountNumber: true,
                updatedAt: true,
                balance: true,
                documentNumber: true,
                blocked: true,
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

        const accountExists = await this.prisma.account.findUnique({
            where: {accountNumber},
            select: {createdAt: true}
        });
        
        if(accountExists) {
            throw new Error('account already exist');
        } else {
            const account = await this.prisma.account.create({
                data: {
                    accountNumber: input.accountNumber!,
                    documentNumber: input.documentNumber!,
                    balance: input.balance!,
                    agency: input.agency!,
                    number: input.number!,
                    blocked: input.blocked!,
                    withdrawValue: 0,
                },
                select: {
                    accountNumber: true,
                    blocked: true,
                    agency: true,
                    number: true,
                    createdAt: false,
                }
            });
            
            return account;
        }
    }
}