import { Action, ThunkAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../../firebase/providersAuth";
import { RootState } from "../..";
import {
    postContract,
    getContractByEmail,
    postPatients,
    getContractById,
    getAllContracts,
} from "../../../services";
import { loadAllContracts, loadContract, loadContractForm } from ".";
import { Contract, Patient } from "../../../models/interfaces";
import { setMessage } from "../ui/uiSlice";

export const thunkLoadContract =
    (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
        const currentUser = getCurrentUser() ?? undefined;
        if (!currentUser) return;
        const contract = await getContractByEmail(currentUser.email!);

        dispatch(loadContract(contract!));
    };

export const thunkAllLoadContracts =
    (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, state) => {
        let contracts = state().contractState.AllContracts;
        if (contracts === undefined || contracts === null || contracts.length === 0) {
            contracts = await getAllContracts();

            dispatch(loadAllContracts(contracts));
        }
    };

export const thunkCreatedContract =
    (contract: Contract): ThunkAction<void, RootState, unknown, Action> =>
        async (dispatch, state) => {
            contract.UserCreated = getCurrentUser().uid || "";
            const numberContract = contract.Number!;
            const payments = contract.Payments!;
            delete contract.Number;
            delete contract.Payments;

            await postContract(numberContract.toString(), contract, payments);

            let patients = state().contractFormSlice.ContractForm!.Patients;
            patients = patients!.map(
                (p) => ({ ...p, Contract: numberContract } as Patient)
            );
            await postPatients(patients);

            //dispatch(cleanPatientsSave());

            dispatch(setMessage(`Se creo el contrato número ${numberContract}`));
        };


export const thunkGetContract =
    (idContract: string): ThunkAction<void, RootState, unknown, Action> =>
        async (dispatch, state) => {
            const contracts = state().contractState.AllContracts.filter(
                (c) => (c.Number == idContract)
            );
            if (contracts && contracts.length > 0 && contracts[0]) {
                dispatch(loadContractForm(contracts[0]));
            } else {
                const contract = await getContractById(idContract);
                if (contract) {
                    dispatch(loadContractForm(contract!));
                }
            }
        };