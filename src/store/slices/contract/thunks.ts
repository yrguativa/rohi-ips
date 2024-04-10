import { Action, ThunkAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../../firebase/providersAuth";
import { RootState } from "../..";
import {
    postContract,
    getContractByEmail,
    getContractById,
    getAllContracts,
} from "../../../services";
import { loadAllContracts, loadContract, loadContractForm } from ".";
import { Contract, } from "../../../models/interfaces";
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
        async (dispatch) => {
            contract.UserCreated = getCurrentUser().uid || "";
            const numberContract = contract.Number!;
            const payments = contract.Payments!;
            const patients = contract.Patients!;

            delete contract.Number;
            delete contract.Payments;
            delete contract.Patients;

            await postContract(numberContract.toString(), contract, payments, patients);

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