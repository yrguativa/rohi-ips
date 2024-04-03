import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaymentStatusEnum, StatusEnum } from '../../../models/enums';
import { Contract, IContractState } from '../../../models/interfaces';

const initialState: IContractState = {
    Contract: {
        Payments: [],
        Status: StatusEnum.Disabled
    },
    StatusPayment: PaymentStatusEnum.Pending,
    AllContracts:[]
};

export const contractSlice = createSlice({
    name: 'client',
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
                Status: StatusEnum.Disabled
            };
        },
    }
});

// Action creators are generated for each case reducer function
export const { loadContract, loadAllContracts, createContract, cleanContract } = contractSlice.actions;