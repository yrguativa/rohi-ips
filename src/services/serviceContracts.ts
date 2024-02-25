import { collection, getDocs, getDoc, where, query, doc, setDoc, addDoc } from 'firebase/firestore/lite';

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

export const getContractByEmail = async (email = ''): Promise<Contract | undefined> => {
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

export const getContractById = async (idContract: string): Promise<Contract | undefined> => {
    if (!idContract) throw new Error('El id del contrato no existe');

    let contract: Contract;
    const docContractsRef = doc(FirebaseDB, "Contracts", idContract.toString());
    const contactsSnap = await getDoc(docContractsRef);

    if (contactsSnap) {
        contract = contactsSnap.data() as Contract;
        contract.Number = contactsSnap.id

        contract.Payments = [];
        const collectionRefPayments = collection(FirebaseDB, `/Contracts/${contactsSnap.id}/Payments`);
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

export const postContract = async (idContract: string, Contract: Contract, payments: Payment[]) => {
    const docContractsRef = doc(FirebaseDB, 'Contracts', idContract);
    await setDoc(docContractsRef, Contract, { merge: true });

    payments.forEach(async pay => {
        if (pay.Id) {
            const idPay = pay.Id
            const paySave: Payment = {
                Rate: pay.Rate,
                Status: pay.Status,
                InvoiceDate: pay.InvoiceDate,
            }
            if (pay.PaymentDate) {
                paySave.PaymentDate = pay.PaymentDate;
            }
            const docPaymentRef = doc(FirebaseDB, 'Contracts', idContract, 'Payments', idPay);
            await setDoc(docPaymentRef, paySave, { merge: true });
        } else {
            const subCollectionRef = collection(docContractsRef, "Payments")
            await addDoc(subCollectionRef, pay);
        }
    });
}