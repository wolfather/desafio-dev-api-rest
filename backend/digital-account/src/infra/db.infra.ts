import { PrismaClient } from "../../prisma/src/generated/client";

import * as dotenv from 'dotenv';

import { UserInfraImp } from "../user/implementation/user_infra_implementation";

dotenv.config()

export class DbConnect {
    protected prisma = new PrismaClient();
    constructor() {}

    async connect(): Promise<void> {
        await this.prisma.$connect();
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}