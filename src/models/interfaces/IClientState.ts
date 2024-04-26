import { PaymentStatusEnum } from "../enums";
import { Contract } from "./IContract";

export interface IClientState {
    Contract?: Contract
    PaymentURL?: string,
    StatusPayment: PaymentStatusEnum,
}