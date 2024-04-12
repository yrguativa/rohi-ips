import { z } from 'zod';
import { IdentificationTypeEnum } from '../models/enums/IdentificationTypeEnum';
import { EPSEnum } from '../models/enums/EpsEnum';

export const patientFormSchema = z //: ZodType<FormPatient> = z
    .object({
        Identification: z
            .coerce
            .number({ required_error: "El número de identificación es requerido", invalid_type_error: "El valor ingresado no es un número valido" }),
        IdentificationType: z
            .string()
            .transform(val => IdentificationTypeEnum[val as keyof typeof IdentificationTypeEnum])
            .refine(val => Object.values(IdentificationTypeEnum).includes(val as IdentificationTypeEnum), {
                message: 'El tipo de identificación no es válido',
            }),
        Name: z
            .string()
            .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
            .max(500, { message: "El nombre debe tener maximo de 500 caracteres" }),
        Email: z
            //.transform(val => val === "" ? undefined : val)
            .optional(
                z.string()
                    .email({ message: "El valor ingresado no es un email valido." })
            ),
        Address: z
            .optional(
                z.string()
                    .min(3, { message: "La dirección debe tener al menos 3 caracteres" })
                    .max(500, { message: "La dirección debe tener maximo de 500 caracteres" })
            ),
        BirthDate: z
            .optional(
                z.string()
                    //.datetime({message: "La fecha de cumpleaños no es valida"})
                    .refine(dob => {
                        // ToDo: validate que funcione la función
                        return (dob === undefined || dob === null || dob === '') ||  (new Date(dob)) !== undefined
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
        EPS: z
            .optional(
                z.string()
                    .transform(val => {
                        val ? EPSEnum[val as keyof typeof EPSEnum] : undefined
                    })
                    .refine(val => {
                        return (val === undefined || val === null || val === '') || Object.values(EPSEnum).includes(val as EPSEnum)
                    }, { message: 'La EPS no es un valor válido' })
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
        // Status: z
        //     .string()
        //     .transform(val => StatusEnum[val as keyof typeof StatusEnum])
        //     .refine(val => Object.values(StatusEnum).includes(val as StatusEnum), {
        //         message: 'El tipo de identificación no es válido',
        //     }),
        Type: z // ToDo: usar enum
            .coerce
            .number({ required_error: "El tipo es requerido", invalid_type_error: "El valor ingresado no es un tipo valido" })
    });

export type FormPatient = z.infer<typeof patientFormSchema>;