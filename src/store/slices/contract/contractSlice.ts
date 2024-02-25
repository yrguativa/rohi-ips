import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaymentStatusEnum, StatusEnum } from '../../../models/enums';
import { IContractState } from '../../../models/interfaces';

const initialState: IContractState = {
    Contract: {
        Payments: [],
        Status: StatusEnum.Disabled
    },
    StatusPayment: PaymentStatusEnum.Pending
};

export const contractSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadContract: (state, action: PayloadAction<IContractState>) => {
            const { payload } = action;

            state.Contract = payload.Contract;
        },
        createContract: (state, action: PayloadAction<IContractState>) => {
            const { payload } = action;

            state.Contract = payload.Contract;
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
export const { loadContract, createContract, cleanContract } = contractSlice.actions;