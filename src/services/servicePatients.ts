import { collection, getDocs, query, where } from "firebase/firestore/lite";
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