import { prismaClient } from "../prisma/client";
import * as dotenv from 'dotenv';

dotenv.config()

export class DbConnect {
    protected prisma = prismaClient;

    constructor() {}

    async connect(): Promise<void> {
        await this.prisma.$connect();
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}