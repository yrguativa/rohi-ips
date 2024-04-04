import { StatusEnum } from "../enums";

export interface IPatientState {
    Patients: Patient[]
    AllPatients: Patient[]
}

export interface Patient {
    Identification?: string;
    Name: string;
    Address: string;
    Contract?: string;
    BirthDate?: number;
    CellPhone?: string;
    City: number;
    EPS: number;
    Email?: string;
    IdentificationType: string;
    Neighborhood?: string;
    Phone?: string;
    Status: StatusEnum;
    Type: number;
}