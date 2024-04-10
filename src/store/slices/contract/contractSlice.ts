import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentStatusEnum, StatusEnum } from "../../../models/enums";
import { Contract, IContractState } from "../../../models/interfaces";
import { FilterContra } from "../../../utils/utilsSearchFilter";

const initialState: IContractState = {
    Contract: {
        Payments: [],
        Status: StatusEnum.Disabled,
    },
    StatusPayment: PaymentStatusEnum.Pending,
    AllContracts: [],
    IsActivateFilter: false,
    ContractsFilter: [],
};

export const contractSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        loadContract: (state, action: PayloadAction<Contract>) => {
            const { payload } = action;

            state.Contract = payload;
        },
        loadAllContracts: (state, action: PayloadAction<Contract[]>) => {
            const { payload } = action;

            state.AllContracts = payload;
        },

        createContract: (state, action: PayloadAction<Contract>) => {
            const { payload } = action;

            state.Contract = payload;
        },
        cleanContract: (state) => {
            state.Contract = {
                Payments: [],
                Status: StatusEnum.Disabled,
            };
        },

        // Reducers by filter navbar
        getContractsFilter: (state, action: PayloadAction<string>) => {
            const { payload } = action;

            state.IsActivateFilter = true;
            state.ContractsFilter = FilterContra(state.AllContracts, payload);
        },
        clearContractsFilter: (state) => {
            state.IsActivateFilter = false;
            state.ContractsFilter = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadContract, loadAllContracts, createContract, cleanContract, getContractsFilter, clearContractsFilter } =   contractSlice.actions;
