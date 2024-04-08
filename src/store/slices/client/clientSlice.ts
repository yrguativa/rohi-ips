import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IContractState } from '../../../models/interfaces/IContractState';
import { PaymentStatusEnum } from '../../../models/enums';

const initialState: IContractState = {
    Contract: undefined,
    StatusPayment: PaymentStatusEnum.Pending,
    AllContracts: [],
    IsActivateFilter: false,
    ContractsFilter: [],
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        urlPayment: (state, action: PayloadAction<string>) => {
            const { payload } = action;

            state.PaymentURL = payload;
            state.StatusPayment = PaymentStatusEnum.Process;
        },
        updateStatusPayment: (state, action: PayloadAction<PaymentStatusEnum>) => {
            const { payload } = action;

            state.StatusPayment = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { urlPayment, updateStatusPayment } = clientSlice.actions;