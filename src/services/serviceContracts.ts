import { collection, getDocs, getDoc, where, query, doc, setDoc, addDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../firebase/config';
import { Contract, Patient, Payment } from '../models/interfaces/';
import { StatusEnum } from '../models/enums';

export const getAllContracts = async () => {
    const contracts: Contract[] = [];
    const documentRef = collection(FirebaseDB, "Contracts");
    const qry = query(documentRef, where("Status", "!=", StatusEnum.Cancel))//, orderBy('Number', 'desc'));
    const querySnapshot = await getDocs(qry);

    const promises = querySnapshot.docs.map(async (doc) => {
        const contractData = doc.data() as Contract;
        const contract = {
            ...contractData,
            Number: doc.id,
            Payments: [],
            Patients: []
        } as Contract;

        const collectionRefPayments = collection(FirebaseDB, `/Contracts/${doc.id}/Payments`);
        const collectionRefPatients = collection(FirebaseDB, `/Contracts/${doc.id}/Patients`);

        const [paymentsSnap, PatientsSnap] = await Promise.all([getDocs(collectionRefPayments), getDocs(collectionRefPatients)]);

        paymentsSnap.forEach(doc => {
            const payment = doc.data() as Payment;
            payment.Id = doc.id;

            contract.Payments!.push(payment);
        });

        PatientsSnap.forEach(doc => {
            const patient = doc.data() as Patient;
            patient.Identification = doc.id;

            if (typeof (patient.Type) !== "number") {
                patient.Type = parseInt(patient.Type);
            }

            contract.Patients!.push(patient);
        });

        contracts.push(contract);
    });

    await Promise.all(promises);

    return contracts;
}

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
            if (payment.Rate && !isNaN(payment.Rate)) {
                try {
                    payment.Rate = parseInt(payment.Rate.toString())
                }
                catch {
                    console.error("Error in convert Rate of payment")
                }
            }
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
        contract.Patients = [];
        contract.Payments = [];

        const collectionRefPayments = collection(FirebaseDB, `/Contracts/${contract.Number}/Payments`);
        const collectionRefPatients = collection(FirebaseDB, `/Contracts/${contract.Number}/Patients`);

        const [paymentsSnap, PatientsSnap] = await Promise.all([getDocs(collectionRefPayments), getDocs(collectionRefPatients)]);

        paymentsSnap.forEach(doc => {
            const payment = doc.data() as Payment;
            payment.Id = doc.id;

            contract.Payments!.push(payment);
        });

        PatientsSnap.forEach(doc => {
            const patient = doc.data() as Patient;
            patient.Identification = doc.id;

            if (typeof (patient.Type) !== "number") {
                patient.Type = parseInt(patient.Type);
            }

            contract.Patients!.push(patient);
        });

        return contract;
    } else {
        return undefined;
    }
}

export const postContract = async (idContract: string, Contract: Contract, payments: Payment[], patients: Patient[]) => {
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
            if (pay.IdOrderMercadoPago) {
                paySave.IdOrderMercadoPago = pay.IdOrderMercadoPago;
            }
            if (pay.IdPayMercadoPago) {
                paySave.IdPayMercadoPago = pay.IdPayMercadoPago;
            }
            const docPaymentRef = doc(FirebaseDB, 'Contracts', idContract, 'Payments', idPay);
            await setDoc(docPaymentRef, paySave, { merge: true });
        } else {
            const subCollectionRef = collection(docContractsRef, "Payments")
            await addDoc(subCollectionRef, pay);
        }
    });

    patients.forEach(async patient => {
        const identification = patient.Identification!;
        const patientSave = { ...patient };
        delete patientSave.Identification;

        const docPaymentRef = doc(FirebaseDB, 'Contracts', idContract, 'Payments', identification);
        await setDoc(docPaymentRef, patientSave, { merge: true });
    });
}