import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IContractState } from '../../../models/interfaces/IContractState';

const initialState: IContractState = {
    Contract: undefined,
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
        }
    }
});

// Action creators are generated for each case reducer function
export const { loadContract, urlPayment } = clientSlice.actions;