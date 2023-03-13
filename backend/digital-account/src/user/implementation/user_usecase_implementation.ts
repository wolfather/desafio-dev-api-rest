import { UserEntity } from "../entity/user";

export interface ExecuteImp {
    success: boolean;
    data: Partial<UserEntity|UserEntity[]>;
    statusCode: number;
    message: string;
}

export interface UserUsecaseImpl<UserEntity> {
    execute(input: Partial<UserEntity>): Promise<Partial<ExecuteImp>>;
}