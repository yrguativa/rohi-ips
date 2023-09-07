
import { Action, ThunkAction } from "@reduxjs/toolkit"

import { RootState } from "../.."
import { getContract } from "../../../services"

import { PaymentStatusEnum } from "../../../models/interfaces/IContractState"
import { loadContract } from "."

export const thunkLoadContract = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        const { uid } = getState().userAuth;
        const contract = await getContract(uid!)

        console.log(contract)
        dispatch(loadContract({ Contract: contract, StatusPayment: PaymentStatusEnum.None }))
    }