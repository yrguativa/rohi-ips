import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { StatusEnum } from "../models/enums";
import { Patient } from "../models/interfaces";

export const getPatients = async () => {
    const patients: Patient[] = [];
    const documentRef = collection(FirebaseDB, "Patients");
    const qry = query(documentRef, where("Status", "!=", StatusEnum.Cancel))//, orderBy('Number', 'desc'));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
        const patient = doc.data() as Patient;
        patient.Identification = doc.id;

        patients.push(patient);
    });

    return patients;
}
export const getPatientsById = async (identification: string) => {
    const patients: Patient[] = [];
    const docRef = doc(FirebaseDB, 'Patients', identification);
    const docSnap = await getDoc(docRef);

    const patient = docSnap.data() as Patient;
    patient.Identification = docSnap.id;
    patients.push(patient);

    return patients;
}
export const getPatientsByName = async (name: string) => {
    const patients: Patient[] = [];
    const documentRef = collection(FirebaseDB, "Patients");
    const qry = query(documentRef, where("Status", "!=", StatusEnum.Cancel), where('Name', ">=", name + "\uf8ff"), where("name", "<=", "\uf8ff" + name))//, orderBy('Number', 'desc'));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
        const patient = doc.data() as Patient;
        patient.Identification = doc.id;

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