import { PaymentStatusEnum, StatusEnum } from "../enums";
import { Patient } from "./IPatientState";

export interface IContractState {
    Contract?: Contract
    PaymentURL?: string,
    StatusPayment: PaymentStatusEnum,
    AllContracts : Contract[],
    IsActivateFilter: boolean,
    ContractsFilter : Contract[]
}

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

export interface Payment {
    Id?: string;
    Rate: number;
    InvoiceDate: number;
    Status: PaymentStatusEnum;
    PaymentDate?: number;
}