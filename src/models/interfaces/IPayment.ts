import { PaymentStatusEnum } from "../enums";

export interface Payment {
    Id?: string;
    Rate: number;
    InvoiceDate: number;
    Status: PaymentStatusEnum;
    PaymentDate?: number;
    IdPayMercadoPago?: string;
}