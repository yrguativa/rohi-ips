
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../.."
import { getPatients} from "../../../services/"
import { loadPatients } from ".";

export const thunkAllLoadPatients = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatients();

        dispatch(loadPatients(patients))
    }