import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IContractState, PaymentStatusEnum } from '../../../models/interfaces/IContractState';

const initialState: IContractState = {
    Contract: undefined,
    StatusPayment: PaymentStatusEnum.None
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadContract: (state, action: PayloadAction<IContractState>) => {
            const { payload } = action;

            state.Contract = payload.Contract;
        },
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
export const { loadContract, urlPayment,updateStatusPayment } = clientSlice.actions;