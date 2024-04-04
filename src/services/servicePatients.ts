import { doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Patient } from "../models/interfaces";


export const postPatients = async (patients: Patient[]) => {
    patients.forEach(async (patient) => {
        const id = patient.Identification!;
        const patientSave = { ...patient };
        delete patientSave.Identification;

        const docRef = doc(FirebaseDB, 'Patients', id);
        await setDoc(docRef, patientSave, { merge: true });
    });

    return patients;
}