import { Contract } from "../models/interfaces";

export const FilterContra = (contracts: Contract[], filter: string): Contract[] => {
    return contracts.filter((c) => {
        const patients = c.Patients?.filter(
            (p) =>
                p.Identification?.includes(filter) || // filter by identification number patient
                p.Name.toLowerCase().includes(filter.toLowerCase()) || // filter by identification number
                (p.Phone && p.Phone.includes(filter)) || //filter by phone number
                (p.CellPhone && p.CellPhone.includes(filter)) //filter by phone number
        );

        return (
            c.Number?.toString().includes(filter) || // filter by contract number
            c.Email?.includes(filter) || // filter by email
            (patients?.length !== undefined && patients.length > 0) // filters of patients
        ); 
    });
};
