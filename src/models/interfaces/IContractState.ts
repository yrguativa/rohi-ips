import { Contract } from "./IContract";

export interface IContractState {
    AllContracts : Contract[],

    // properties by search in navbar
    IsActivateFilter: boolean,
    ContractsFilter : Contract[]
}

export interface IContractFormState {
    ContractForm?: Contract,
}