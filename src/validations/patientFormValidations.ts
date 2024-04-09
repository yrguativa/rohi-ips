import { z } from 'zod';
import { IdentificationTypeEnum } from '../models/enums/IdentificationTypeEnum';
import { StatusEnum } from '../models/enums';
import { EPSEnum } from '../models/enums/EpsEnum';

export const patientFormSchema = z //: ZodType<FormPatient> = z
    .object({
        Identification: z
            .string()
            .refine((weight) => !isNaN(parseFloat(weight)), { message: "Weight must be a number", }),
        IdentificationType: z
            .nativeEnum(IdentificationTypeEnum),
        Name: z
            .string()
            .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
            .max(500, { message: "El nombre debe tener menos de 500 caracteres", }),
        Address: z.string()
            .min(3, { message: "La dirección debe tener al menos 3 caracteres" })
            .max(500, { message: "La dirección debe tener menos de 500 caracteres", }),
        BirthDate: z
            .number()
            .refine(dob => new Date(dob).toString() !== "Invalid Date", { message: "Please enter a valid date of birth" }),
        CellPhone: z
            .coerce.number({ required_error:"El celular es requerido", invalid_type_error: "El valor ingresado no es un celular"})
            .refine((weight) => {
                console.log("🚀 ~ CellPhone:z.string ~ weight:", weight);
                return !isNaN(parseFloat(weight.toString()))
            }, { message: "Weight must be a number", }),
        City: z
            .number(),
        EPS: z
            .nativeEnum(EPSEnum),
        Email: z
            .string()
            .min(6, { message: "Por favor ingresa una fecha de nacimiento valida", }),
        Neighborhood: z
            .string()
            .min(3, { message: "El barrio debe tener al menos 3 caracteres", })
            .max(500, { message: "El barrio debe tener menos de 500 caracteres", }),
        Phone: z
            .number()
            .refine((weight) => !isNaN(parseFloat(weight.toString())), { message: "Weight must be a number", }),
        Status: z
            .nativeEnum(StatusEnum),
        Type: z
            .number()
    });


export type FormPatient = z.infer<typeof patientFormSchema>;