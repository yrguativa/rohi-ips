
import { doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Payment } from "../models/interfaces";

export const postPayment = async (idContract: string, payment: Payment) => {
    const docPaymentRef = doc(FirebaseDB, 'Contracts', idContract, 'Payments', payment.Id!);

    const paySave: Payment = {
        Rate: payment.Rate,
        Status: payment.Status,
        InvoiceDate: payment.InvoiceDate,
    }
    if (payment.PaymentDate) {
        paySave.PaymentDate = payment.PaymentDate;
    }
    if (payment.IdOrderMercadoPago) {
        paySave.IdOrderMercadoPago = payment.IdOrderMercadoPago;
    }
    if (payment.IdPayMercadoPago) {
        paySave.IdPayMercadoPago = payment.IdPayMercadoPago;
    }
    if (payment.NumberInvoiceRohi) {
        paySave.NumberInvoiceRohi = payment.NumberInvoiceRohi;
    }

    await setDoc(docPaymentRef, paySave, { merge: true });
}