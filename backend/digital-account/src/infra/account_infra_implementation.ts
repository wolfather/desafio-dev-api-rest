import { Account } from "@prisma/client";

export abstract class AccountInfraImp {
    abstract createAccount: (input: Partial<Account>) => Promise<Partial<Account>>;
    abstract getAccount: (input: Partial<Account>) => Promise<Account>;
    abstract getAccounts: (input: Partial<Account>) => Promise<Account[]>;
    abstract updateAccount: (input: Partial<Account>) => Promise<Partial<Account>>;
    abstract deleteAccount: (input: string) => Promise<Partial<Account>>;
}
