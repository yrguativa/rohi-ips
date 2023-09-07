
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { getCurrentUser } from "../../../firebase/providersAuth"
import { RootState } from "../.."
import { getContract } from "../../../services"
import { loadContract } from "."
import { PaymentStatusEnum } from "../../../models/enums"

export const thunkLoadContract = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const currentUser = getCurrentUser() ?? undefined;
        if (!currentUser) return;
        const contract = await getContract(currentUser.uid!)

        console.log(contract)
        dispatch(loadContract({ Contract: contract, StatusPayment: PaymentStatusEnum.None }))
    }
