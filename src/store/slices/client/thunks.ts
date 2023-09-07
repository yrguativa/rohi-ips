
import { Action, ThunkAction } from "@reduxjs/toolkit"

import { RootState } from "../.."
import { updateStatusPayment, urlPayment } from "."
import { CreatedOrder } from "../../../services/servicePayments"
import { PaymentStatusEnum } from "../../../models/interfaces/IContractState"

export const thunkPayment = (idPayment: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const payment = getState().contractState.Contract?.Payments.find(p => p.Id == idPayment);
        const { uid: uidUser, displayName: userName } = getState().userAuth;
        if (!payment) throw new Error('Payment not found in store');
        // TODO: Send Month
        const result = await CreatedOrder(payment.Id, uidUser!, userName!, payment.Rate, 'August');
        console.log(result)
        if (result.init_point !== undefined && result.init_point !== null && result.init_point !== '') {
            dispatch(urlPayment(result.init_point));
            window.open(result.init_point, "_blank");
        }
        else
            dispatch(updateStatusPayment(PaymentStatusEnum.Error))
    }
