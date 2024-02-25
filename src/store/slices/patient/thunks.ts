
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../.."
import { getPatients, getPatientsByContract } from "../../../services/"
import { loadPatients, loadPatientsSave } from ".";

export const thunkAllLoadPatients = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatients();

        dispatch(loadPatients(patients))
    }

export const thunkLoadPatients = (idContract: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatientsByContract(idContract);

        dispatch(loadPatientsSave(patients))
    }

