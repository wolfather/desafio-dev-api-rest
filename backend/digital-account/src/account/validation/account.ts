import { Account } from '@prisma/client'
import { z } from 'zod'

const rules = {
    agency: {
        max: 5,
        min: 5
    },
    number: {
        min: 4,
        max: 4
    }
}


export const createAccountValidation = (account: Partial<Account>): boolean => {
    const accountModel = z.object({
        accountNumber: z.string().min(4),
        agency: z.number()
            .min(rules.agency.min, {message: `Agency number should have at least ${rules.agency.min} digits`})
            .max(rules.agency.max, {message: `Agency number should have ${rules.agency.max} digits at max`}),
        number: z.number()
            .min(rules.number.min, {message: `Agency number should have at least ${rules.number.min} digits`})
            .max(rules.number.min, {message: `Agency number should have ${rules.number.min} digits at max`}),
        blocked: z.boolean(),
        balance: z.number().min(1, {message: 'Your balance cannot be 0'})
    });

    return accountModel.safeParse(account).success;
}