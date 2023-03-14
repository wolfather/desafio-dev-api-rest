import { prismaClient } from "../prisma/client";
import * as dotenv from 'dotenv';

dotenv.config()

export class DbConnect {
    protected prisma = prismaClient;

    constructor() {}
}