import { StatusEnum } from "../enums";
import { Patient } from "./IPatientState";
import { Payment } from "./IPayment";

export interface Contract {
    Number?: string;
    Email?: string;
    Status: StatusEnum;
    Rate?: number;
    DateEnd?: number;
    DateStart?: number;
    Payments?: Payment[];
    Patients?: Patient[]
    UserCreated?: string;
}