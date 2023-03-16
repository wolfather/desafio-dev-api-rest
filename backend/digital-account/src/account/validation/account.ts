import { Account } from '@prisma/client'
import { z } from 'zod'

const rules = {
    agency: {
        max: 5,
    },
    number: {
        max: 4
    }
}


export const accountValidation = (input: Partial<Account>): boolean => {
    const v = z.number().positive()
    console.log('balance:', input.balance, v.safeParse(input.balance));

    
    const accountModel = z.object({
        agency: z.number()
            .positive()
            .gte(rules.agency.max),
        number: z.number()
            .positive()
            .gte(rules.number.max),
        blocked: z.boolean(),
        balance: z.number().positive()
    });

    return accountModel.safeParse(input).success;
}