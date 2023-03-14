import { Account } from "@prisma/client";

export interface ExecuteImplementation {
    success: boolean;
    data: Partial<Account>;
    statusCode: number;
    message: string;
}

export interface AccountUsecaseImplementation<Account> {
    execute(input: Partial<Account>): Promise<Partial<ExecuteImplementation>>;
}

export interface GetAccountUsecaseImplementation {
    execute(input: Partial<Account>): Promise<Partial<ExecuteImplementation>>;
}