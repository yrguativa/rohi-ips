import { Patient } from "./IPatientState";

export interface IContractState {
    Contract?: Contract
    PaymentURL?: string,
    StatusPayment:number,
}

export interface Contract {
    Number?: string;
    Rate?: number;
    DateEnd?: DateEnd;
    DateStart?: DateEnd;
    Patients: Patient[];
    Payments: Payment[];
    Status: number;
}

export interface Payment {
    Id: string;
    Rate: number;
    InvoiceDate: DateEnd;
}

interface DateEnd {
    seconds: number;
    nanoseconds: number;
}