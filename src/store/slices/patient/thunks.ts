
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../.."
import { getPatients, getPatientsById, getPatientsByName } from "../../../services/"
import { loadPatients } from ".";

export const thunkAllLoadPatients = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatients();

        dispatch(loadPatients(patients))
    }

export const thunkLoadPatientsById = (identification: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatientsById(identification);

        dispatch(loadPatients(patients))
    }

export const thunkLoadPatientsByName = (name: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const patients = await getPatientsByName(name);

        dispatch(loadPatients(patients))
    }