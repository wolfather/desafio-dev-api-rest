import { User } from "@prisma/client";

export interface ExecuteImplementation {
    success: boolean;
    data: Partial<User>;
    statusCode: number;
    message: string;
}

export interface UserUsecaseImplementation<T> {
    execute(input: string|Partial<T>): Promise<Partial<ExecuteImplementation>>;
}

export interface GetUserUsecaseImplementation {
    execute(input: string): Promise<Partial<ExecuteImplementation>>;
}