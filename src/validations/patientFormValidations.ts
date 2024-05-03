import { z } from 'zod';
import { IdentificationTypeEnum } from '../models/enums/IdentificationTypeEnum';
import { EPSEnum } from '../models/enums/EpsEnum';

export const patientFormSchema = z //: ZodType<FormPatient> = z
    .object({
        Identification: z
            .coerce
            .number({ required_error: "El número de identificación es requerido", invalid_type_error: "El valor ingresado no es un número valido" })
            .gte(100000, { message: "El número de identificación debe tener al menos 6 caracteres" }),
        IdentificationType: z
            .coerce.number()
            //.transform(val => IdentificationTypeEnum[val.toString() as keyof typeof IdentificationTypeEnum])
            .refine(val => IdentificationTypeEnum[val.toString() as keyof typeof IdentificationTypeEnum] != undefined, {
                message: 'El tipo de identificación no es válido',
            }),
        Name: z
            .string()
            .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
            .max(500, { message: "El nombre debe tener maximo de 500 caracteres" }),
        Email: z
            .optional(
                z.string()
                    .email({ message: "El valor ingresado no es un email valido." })
            ),
        EPS: z
            .optional(
                z.coerce.number()
                    // .transform(val => {
                    //     return val ? EPSEnum[val.toString() as keyof typeof EPSEnum]: undefined
                    // })
                    .refine(val => {
                        return val === undefined || EPSEnum[val.toString() as keyof typeof EPSEnum] != undefined
                    }, { message: 'La EPS no es un valor válido' })
            ),
        Address: z
            .optional(
                z.string()
                    .min(3, { message: "La dirección debe tener al menos 3 caracteres" })
                    .max(500, { message: "La dirección debe tener maximo de 500 caracteres" })
            ),
        BirthDate: z
            .optional(
                z.coerce
                    .string()
                    //.datetime({message: "La fecha de cumpleaños no es valida"})
                    .refine(dob => {
                        // ToDo: validate que funcione la función
                        return (dob === undefined || dob === null || dob === '') || (new Date(dob)) !== undefined
                    }, { message: "La fecha de cumpleaños no tiene un valor valido" })
            ),
        CellPhone: z
            .optional(
                z.coerce
                    .number({ required_error: "El celular es requerido", invalid_type_error: "El valor ingresado no es un celular" })
                    .gte(1000000000, { message: "El celular debe tener al menos 10 caracteres" })
            ),
        City: z // ToDo: validate is number 
            .optional(
                z.coerce
                    .number({ required_error: "La ciudad es requerida", invalid_type_error: "El valor ingresado no es una ciudad valida" })
            ),
        Neighborhood: z
            .optional(
                z.string()
                    .min(3, { message: "El barrio debe tener al menos 3 caracteres", })
                    .max(100, { message: "El barrio debe tener maximo de 100 caracteres" })
            ),
        Phone: z
            .optional(
                z.coerce
                    .number({ required_error: "El telefono es requerido", invalid_type_error: "El valor ingresado no es un telefono" })
                    .gte(100000, { message: "El telefono debe tener al menos 6 caracteres" })
            ),
        Type: z // ToDo: usar enum
            .coerce
            .number({ required_error: "El tipo es requerido", invalid_type_error: "El valor ingresado no es un tipo valido" })
    });

export type FormPatient = z.infer<typeof patientFormSchema>;