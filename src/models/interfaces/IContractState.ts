
export interface IContractState {
    Contract?: Contract
    PaymentURL?: string,
    StatusPayment:PaymentStatusEnum,
}

export interface Contract {
    Number?: string;
    Rate?: number;
    DateEnd?: DateEnd;
    DateStart?: DateEnd;
    Patients: Patient[];
    Payments: Payment[];
    Status: StatusEnum;
}

export interface Patient {
    Identification: string;
    Status: number;
    Type: number;
    Address: string;
    Name: string;
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

export enum StatusEnum {
    Active = 1,
    Disabled,
    Cancel,
}

export enum PaymentStatusEnum {
    None = 1,
    Process,
    Error,
}