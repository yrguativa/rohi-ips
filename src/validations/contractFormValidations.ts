import { z } from 'zod';
import { StatusEnum } from '../models/enums';

export const contractFormSchema = z //: ZodType<FormPatient> = z
    .object({
        Number: z.number(),
        Email: z.string(),
        Rate: z.number(),
        Status: z.nativeEnum(StatusEnum),
        DateStart: z.string(),
        DateEnd: z.string(),
        DateNextPayment: z.string(),
    });

export type FormContract = z.infer<typeof contractFormSchema>;