import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Patient, Payment } from "../models/interfaces";
import { Contract } from "../models/interfaces";
import { StatusEnum } from "../models/enums";

export async function ApplyPayment(idContract: string, contract: Contract, idPayment: string, payment: Payment) {
    const docContractsRef = doc(FirebaseDB, 'Contracts', idContract);
    await setDoc(docContractsRef, contract, { merge: true });

    const docRef = doc(FirebaseDB, `Contracts/${idContract}/Payments/${idPayment}`);
    await setDoc(docRef, payment, { merge: true });

    const documentRef = collection(FirebaseDB, "Patients");
    const qry = query(documentRef, where("Contract", "==", idContract,))
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach(async (docPatient) => {
        const patient = docPatient.data() as Patient;
        patient.Status = StatusEnum.Active;

        await setDoc(doc(documentRef, docPatient.id), patient, { merge: true });
    });
}