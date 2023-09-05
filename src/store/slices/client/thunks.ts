
import { Action, ThunkAction } from "@reduxjs/toolkit"

import { RootState } from "../.."
import { getContract } from "../../../services"
import { loadContract, updateStatusPayment, urlPayment } from "."
import { CreatedOrder } from "../../../services/servicePayments"
import { PaymentStatusEnum } from "../../../models/interfaces/IContractState"

export const thunkLoadContract = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const { uid } = getState().userAuth;
        const contract = await getContract(uid!)

        console.log(contract)
        dispatch(loadContract({ Contract: contract, StatusPayment: PaymentStatusEnum.None }))
    }


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
