export interface IPatientState {
    Patients: Patient[]
}

export interface Patient {
    Identification?: string;
    Name: string;
    Address: string;
    Type: number;
    Status: number;
    Contract?: string;
}