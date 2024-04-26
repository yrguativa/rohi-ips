import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Contract, IContractState } from "../../../models/interfaces";
import { FilterContra } from "../../../utils/utilsSearchFilter";

const initialState: IContractState = {
    AllContracts: [],
    IsActivateFilter: false,
    ContractsFilter: [],
};

export const contractSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        loadAllContracts: (state, action: PayloadAction<Contract[]>) => {
            const { payload } = action;

            state.AllContracts = payload;
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
export const { loadAllContracts, getContractsFilter, clearContractsFilter } =   contractSlice.actions;
