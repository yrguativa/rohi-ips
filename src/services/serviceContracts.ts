import { collection, getDocs,  where, query } from 'firebase/firestore/lite';

import { FirebaseDB } from '../firebase/config';
import { Contract, Patient, Payment, StatusEnum } from '../models/interfaces/IContractState';

export const getContract = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    let contract: Contract;
    const contractRef = collection(FirebaseDB, "Contracts",);
    const q = query(contractRef, where("User", "==", uid), where("Status", "==", StatusEnum.Active))//, orderBy('Number', 'desc'));
    const contactsSnap = await getDocs(q);

    if (contactsSnap.size > 0) {
        contract = contactsSnap.docs[0].data() as Contract;
        contract.Number = contactsSnap.docs[0].id
        contract.Patients = [];
        contract.Payments = [];

        const collectionRefPatients = collection(FirebaseDB, `/Contracts/${contactsSnap.docs[0].id}/Patients`);
        const patientsSnap = await getDocs(collectionRefPatients);
        patientsSnap.forEach(doc => {
            const patient = doc.data() as Patient;
            patient.Identification = doc.id;

            contract.Patients.push(patient);
        });

        const collectionRefPayments = collection(FirebaseDB, `/Contracts/${contactsSnap.docs[0].id}/Payments`);
        const paymentsSnap = await getDocs(collectionRefPayments);
        paymentsSnap.forEach(doc => {
            const payment = doc.data() as Payment;
            payment.Id = doc.id;

            contract.Payments.push(payment);
        });
        console.log(contract)

        return contract;
    } else {
        throw new Error('Error! get error with query by get contract')
    }
}