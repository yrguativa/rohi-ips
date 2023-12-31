
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { getCurrentUser } from "../../../firebase/providersAuth"
import { RootState } from "../.."
import { postContract, getContractByEmail, postPatients } from "../../../services"
import { loadContract } from "."
import { PaymentStatusEnum } from "../../../models/enums"
import { Contract, Patient } from "../../../models/interfaces"
import { cleanPatientsSave } from "../patient"
import { setMessage } from "../ui/uiSlice"

export const thunkLoadContract = (): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const currentUser = getCurrentUser() ?? undefined;
        if (!currentUser) return;
        const contract = await getContractByEmail(currentUser.email!)

        dispatch(loadContract({ Contract: contract, StatusPayment: PaymentStatusEnum.Pending }))
    }


export const thunkCreatedContract = (contract: Contract): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, state) => {
        contract.UserCreated = getCurrentUser().uid || '';
        const numberContract = contract.Number!;
        const payments = contract.Payments!;
        delete contract.Number;
        delete contract.Payments;

        await postContract(numberContract.toString(), contract, payments);

        let patients = state().patientSaveState.Patients;
        patients = patients.map(p => ({ ...p, Contract: numberContract } as Patient));
        await postPatients(patients);

        dispatch(cleanPatientsSave());

        dispatch(setMessage(`Se creo el contrato número ${numberContract}`));
    }