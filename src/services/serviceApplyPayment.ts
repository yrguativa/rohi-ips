import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Patient, Payment } from "../models/interfaces";
import { Contract } from '../models/interfaces/IContractState';
import { StatusEnum } from "../models/enums";

export async function ApplyPayment(icContract: string, Contract: Contract, idPayment: string, payment: Payment) {
    const docContractsRef = doc(FirebaseDB, 'Contracts', icContract);
    await setDoc(docContractsRef, Contract, { merge: true });

    const docRef = doc(FirebaseDB, `Contracts/${icContract}/Payments/${idPayment}`);
    await setDoc(docRef, payment, { merge: true });

    const documentRef = collection(FirebaseDB, "Patients");
    const qry = query(documentRef, where("Contract", "==", icContract))//, orderBy('Number', 'desc'));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach(async (doc) => {
        const patient = doc.data() as Patient;
        patient.Status = StatusEnum.Active; 

        await setDoc(docRef, patient, { merge: true });
    });
}