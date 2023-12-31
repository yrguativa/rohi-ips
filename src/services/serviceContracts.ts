import { collection, getDocs, where, query, doc, setDoc, addDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../firebase/config';
import { Contract, Payment } from '../models/interfaces/';

export const getContract = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    let contract: Contract;
    const contractRef = collection(FirebaseDB, "Contracts");
    const q = query(contractRef, where("User", "==", uid))//, orderBy('Number', 'desc'));
    const contactsSnap = await getDocs(q);

    if (contactsSnap.size > 0) {
        contract = contactsSnap.docs[0].data() as Contract;
        contract.Number = contactsSnap.docs[0].id

        contract.Payments = [];
        const collectionRefPayments = collection(FirebaseDB, `/Contracts/${contactsSnap.docs[0].id}/Payments`);
        const paymentsSnap = await getDocs(collectionRefPayments);
        paymentsSnap.forEach(doc => {
            const payment = doc.data() as Payment;
            payment.Id = doc.id;

            contract.Payments!.push(payment);
        });

        return contract;
    } else {
        throw new Error('Error! get error with query by get contract')
    }
}


export const getContractByEmail = async (email = '') : Promise<Contract | undefined> => {
    if (!email) throw new Error('El email del usuario no existe');

    let contract: Contract;
    const contractRef = collection(FirebaseDB, "Contracts");
    const q = query(contractRef, where("Email", "==", email))//, orderBy('Number', 'desc'));
    const contactsSnap = await getDocs(q);

    if (contactsSnap.size > 0) {
        contract = contactsSnap.docs[0].data() as Contract;
        contract.Number = contactsSnap.docs[0].id

        contract.Payments = [];
        const collectionRefPayments = collection(FirebaseDB, `/Contracts/${contactsSnap.docs[0].id}/Payments`);
        const paymentsSnap = await getDocs(collectionRefPayments);
        paymentsSnap.forEach(doc => {
            const payment = doc.data() as Payment;
            payment.Id = doc.id;

            contract.Payments!.push(payment);
        });

        return contract;
    } else {
        return undefined;
    }
}

export const postContract = async (icContract: string, Contract: Contract, payments: Payment[]) => {
    const docContractsRef = doc(FirebaseDB, 'Contracts', icContract);
    await setDoc(docContractsRef, Contract, { merge: true });

    payments.forEach(async pay => {
        const subCollectionRef = collection(docContractsRef, "Payments")
        await addDoc(subCollectionRef, pay);
    });
}