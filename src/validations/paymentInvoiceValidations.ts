import { z } from 'zod';

export const paymentInvoiceSchema = z 
    .object({
        NumberInvoice: z
            .string()
            .min(3, { message: "El nùmero de la factura debe tener al menos 3 caracteres" })
            .max(500, { message: "El nùmero de la factura debe tener maximo de 500 caracteres" }),
    });

export type PaymentInvoiceContract = z.infer<typeof paymentInvoiceSchema>;