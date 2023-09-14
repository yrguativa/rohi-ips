import { PaymentStatusEnum, StatusEnum } from "../enums";

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
    Payments?: Payment[];
    UserCreated?: string;
}

export interface Payment {
    Id?: string;
    Rate: number;
    InvoiceDate: number;
    Status: PaymentStatusEnum;
    PaymentDate?: number;
}