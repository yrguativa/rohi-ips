import { doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Payment } from "../models/interfaces";
import { Contract } from '../models/interfaces/IContractState';

export async function ApplyPayment(icContract: string, Contract: Contract, idPayment: string, payment: Payment) {
    const docContractsRef = doc(FirebaseDB, 'Contracts', icContract);
    const resultContracts = await setDoc(docContractsRef, Contract, { merge: true });
    console.log('resultContracts', resultContracts)

    const docRef = doc(FirebaseDB, `Contracts/${icContract}/Payments/${idPayment}`);
    const result = await setDoc(docRef, payment, { merge: true });
    console.log(result)
}