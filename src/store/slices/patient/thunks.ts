
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../.."
import { getPatientsByContract } from "../../../services/"
import { loadPatientsSave } from ".";

export const thunkLoadPatients = (idContract: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatientsByContract(idContract);

        dispatch(loadPatientsSave(patients))
    }

