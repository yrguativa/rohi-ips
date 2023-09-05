
import { Action, ThunkAction } from "@reduxjs/toolkit"

import { RootState } from "../.."
import { getContract } from "../../../services"
import { loadContract, urlPayment } from "."
import { CreatedOrder } from "../../../services/servicePayments"

export const thunkLoadContract = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const { uid } = getState().userAuth;
        const contract = await getContract(uid!)

        console.log(contract)
        dispatch(loadContract({ Contract: contract }))
    }


export const thunkPayment = (idPayment: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const payment = getState().contractState.Contract?.Payments.find(p => p.Id == idPayment);
        const { uid: uidUser, displayName: userName } = getState().userAuth;
        if (!payment) throw new Error('Payment not found in store');
        // TODO: Send Month
        const result = await CreatedOrder(payment.Id, uidUser!, userName!, payment.Rate, 'August')

        console.log(result)
        dispatch(urlPayment('stes'))
    }
