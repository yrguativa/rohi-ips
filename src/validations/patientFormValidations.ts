import { z } from 'zod';
import { IdentificationTypeEnum } from '../models/enums/IdentificationTypeEnum';
import { StatusEnum } from '../models/enums';
import { EPSEnum } from '../models/enums/EpsEnum';

export const patientFormSchema = z //: ZodType<FormPatient> = z
    .object({
        Identification: z
            .number({ required_error:"El celular es requerido", invalid_type_error: "El valor ingresado no es un celular"}),
        IdentificationType: z // ToDo: error
            .nativeEnum(IdentificationTypeEnum, { invalid_type_error: 'La tipo de identificación no es valida', required_error: "La tipo de identificación es requerida" } ),
        Name: z
            .string()
            .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
            .max(500, { message: "El nombre debe tener menos de 500 caracteres" }),
        Address: z
            .string()
            .min(3, { message: "La dirección debe tener al menos 3 caracteres" })
            .max(500, { message: "La dirección debe tener menos de 500 caracteres", }),
        BirthDate: z // ToDo: convert
            .number()
            .refine(dob => new Date(dob).toString() !== "Invalid Date", { message: "La fecha de cumpleaños no tiene un valor valido" }),
        CellPhone: z
            .number({ required_error:"El celular es requerido", invalid_type_error: "El valor ingresado no es un celular"})
            .min(10, { message: "El nombre debe tener al menos 10 caracteres" })
            .max(15, { message: "El nombre debe tener menos de 15 caracteres" }),
        City: z // ToDo: convert
            .number({ required_error:"La ciudad es requerida", invalid_type_error: "El valor ingresado no es una ciudad valida"}),
        EPS: z // ToDo: convert
            .nativeEnum(EPSEnum, { invalid_type_error: 'La EPS no es valida', required_error: "La EPS es requerida" }),
        Email: z 
            .string()
            .email("El valor ingresado no es un email valido.")
            .min(6, { message: "El nombre debe tener al menos 6 caracteres" }),
        Neighborhood: z
            .string()
            .min(3, { message: "El barrio debe tener al menos 3 caracteres", })
            .max(100, { message: "El barrio debe tener menos de 100 caracteres" }),
        Phone: z
            .number({ required_error:"El telefono es requerido", invalid_type_error: "El valor ingresado no es un telefono"})
            .min(6, { message: "El nombre debe tener al menos 6 caracteres" })
            .max(15, { message: "El nombre debe tener menos de 15 caracteres" }),
        Status: z // ToDo: convert
            .nativeEnum(StatusEnum, { invalid_type_error: 'La Estado no es valida', required_error: "La Estado es requerida" }),
        Type: z // ToDo: usar enum
            .number({ required_error:"El tipo es requerido", invalid_type_error: "El valor ingresado no es un tipo valido"})
    });


export type FormPatient = z.infer<typeof patientFormSchema>;