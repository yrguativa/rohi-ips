import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { StatusEnum } from "../models/enums";
import { Patient } from "../models/interfaces";

export const getPatientsByContract = async (idContract: string) => {
    const patients: Patient[] = [];
    const documentRef = collection(FirebaseDB, "Patients");
    const qry = query(documentRef, where("Contract", "==", idContract), where("Status", "!=", StatusEnum.Cancel))//, orderBy('Number', 'desc'));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
        const patient = doc.data() as Patient;
        patient.Identification = doc.id;
        if (typeof (patient.Type) !== "number") {
            patient.Type = parseInt(patient.Type);
        }
        patients.push(patient);
    });

    return patients;
}

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