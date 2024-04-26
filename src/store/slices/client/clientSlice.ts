import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaymentStatusEnum } from '../../../models/enums';
import { Contract, IClientState } from '../../../models/interfaces';

const initialState: IClientState = {
    Contract: undefined,
    StatusPayment: PaymentStatusEnum.Pending,
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadContract: (state, action: PayloadAction<Contract>) => {
            const { payload } = action;

            state.Contract = payload;
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
export const { loadContract, urlPayment, updateStatusPayment } = clientSlice.actions;