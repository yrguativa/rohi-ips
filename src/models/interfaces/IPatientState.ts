import { StatusEnum } from "../enums";

export interface IPatientState {
    Patients: Patient[]
    AllPatients: Patient[]
}

export interface Patient {
    Identification?: string;
    IdentificationType: number;
    Name: string;
    Address?: string;
    BirthDate?: number;
    CellPhone?: string;
    City?: number;
    EPS?: number;
    Email?: string;
    Neighborhood?: string;
    Phone?: string;
    Status: StatusEnum;
    Type: number;
}