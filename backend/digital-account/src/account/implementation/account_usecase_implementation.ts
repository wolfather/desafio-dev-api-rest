import { Account } from "@prisma/client";

export interface ExecuteImplementation<T> {
    success: boolean;
    data: Partial<T>;
    statusCode: number;
    message: string;
}

export interface AccountUsecaseImplementation<T> {
    execute(input: Partial<T>): Promise<Partial<ExecuteImplementation<T>>>;
}

export interface GetAccountUsecaseImplementation<T> {
    execute(input: Partial<T>): Promise<Partial<ExecuteImplementation<T>>>;
}