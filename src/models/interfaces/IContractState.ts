import { PaymentStatusEnum, StatusEnum } from "../enums";
import { Patient } from "./IPatientState";

export interface IContractState {
    Contract?: Contract
    PaymentURL?: string,
    StatusPayment: PaymentStatusEnum,
}

export interface Contract {
    Number?: string;
    Status: StatusEnum;
    Rate?: number;
    DateEnd?: number;
    DateStart?: number;
    Patients?: Patient[];
    Payments?: Payment[];
}

export interface Payment {
    Id?: string;
    Rate: number;
    InvoiceDate: number;
    Status: PaymentStatusEnum;
    PaymentDate?: number;
}