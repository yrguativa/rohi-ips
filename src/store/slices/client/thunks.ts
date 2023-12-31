
import { Action, ThunkAction } from "@reduxjs/toolkit"

import { RootState } from "../.."
import { updateStatusPayment, urlPayment } from "."
import { CreatedOrder } from "../../../services/servicePayments"
import { PaymentStatusEnum, StatusEnum } from "../../../models/enums"
import { ApplyPayment, getContractByEmail } from "../../../services"
import { getCurrentUser } from "../../../firebase/providersAuth"


export const thunkPayment = (idPayment: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const payment = getState().contractState.Contract?.Payments?.find(p => p.Id == idPayment);
        const { uid: uidUser, displayName: userName } = getState().userAuthState;
        if (!payment) throw new Error('Payment not found in store');
        // TODO: Extraert in function file Month
        const monthTxt = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const invoiceDate = new Date(payment.InvoiceDate! * 1000);
        const result = await CreatedOrder(payment.Id!, uidUser!, userName!, payment.Rate, monthTxt[invoiceDate.getMonth()]);
        if (result.init_point !== undefined && result.init_point !== null && result.init_point !== '') {
            dispatch(urlPayment(result.init_point));
            window.open(result.init_point, "_blank");
        }
        else
            dispatch(updateStatusPayment(PaymentStatusEnum.Error))
    }


export const thunkPaymentApply = (idPayment: string): ThunkAction<void, RootState, unknown, Action> =>
    async () => {
        const currentUser = getCurrentUser() ?? undefined;
        if (!currentUser) return;

        const contract = await getContractByEmail(currentUser.email!)
        const payment = contract?.Payments?.find(p => p.Id == idPayment);
        if (!contract?.Number) throw new Error('Contract not found in store');
        if (!payment) throw new Error('Payment not found in store');

        const paymentToFireStore = {
            ...payment,
            Status: PaymentStatusEnum.Approved,
            PaymentDate: new Date().getTime(),
        };
        delete paymentToFireStore.Id;

        const contractToFireStore = {
            ...contract,
            Status: StatusEnum.Active,
            User: currentUser.uid
        };
        delete contractToFireStore.Number;
        delete contractToFireStore.Payments;

        await ApplyPayment(contract!.Number!, contractToFireStore, payment.Id!, paymentToFireStore);
    }
