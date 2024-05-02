
import { Action, ThunkAction } from "@reduxjs/toolkit"

import { RootState } from "../.."
import { loadContract, updateStatusPayment, urlPayment } from "."
import { CreatedOrder } from "../../../services/servicePaymentMercadoPago"
import { PaymentStatusEnum } from "../../../models/enums"
import { getContractByEmail } from "../../../services"
import { getCurrentUser } from "../../../firebase/providersAuth"
import { postPayment } from "../../../services/servicePayment"


export const thunkLoadContractByUser =
    (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, state) => {
        const contract = state().clientState.Contract;
        if (contract === undefined || contract === null) {
            const currentUser = getCurrentUser() ?? undefined;
            if (!currentUser) return;
            const contract = await getContractByEmail(currentUser.email!);

            dispatch(loadContract(contract!));
        }
    };

export const thunkPayment = (idPayment: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const contract = getState().clientState.Contract;
        const payment = contract?.Payments?.find(p => p.Id == idPayment);

        if (!payment) throw new Error('Payment not found in store');

        const { uid: uidUser, displayName: userName } = getState().userAuthState;
        const invoiceDate = new Date(payment.InvoiceDate! * 1000);
        const result = await CreatedOrder(contract!.Number!, payment.Id!, uidUser!, userName!, payment.Rate, invoiceDate);
        if (result && result.id) {
            const pay = { ...payment, IdOrderMercadoPago: result.id }
            await postPayment(contract!.Number!, pay)
        }
        if (result.init_point !== undefined && result.init_point !== null && result.init_point !== '') {
            dispatch(urlPayment(result.init_point));
            window.open(result.init_point, "_blank");
        }
        else
            dispatch(updateStatusPayment(PaymentStatusEnum.Error))
    }
