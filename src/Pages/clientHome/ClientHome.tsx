import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { thunkPayment } from "../../store/slices/client";
import { thunkLoadContract } from "../../store/slices/contract";


export default function UserHome() {
    const dispatch = useAppDispatch();
    const { Contract } = useAppSelector(state => state.contractState);

    useEffect(() => {
        console.log('usefect')
        dispatch(thunkLoadContract());
    }, [dispatch]);

    const loginGoogle = () => {
        dispatch(thunkLoadContract());
    };

    const paymentContract = (idPayment: string) => {
        dispatch(thunkPayment(idPayment))
    };

    return (
        <table className="table-fixe">
            <thead>
                <tr>
                    <th>Pago</th>
                    <th>Valor</th>
                    <th>
                        <button onClick={loginGoogle} className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Pagar
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    Contract?.Payments.map(payment => (
                        <tr key={payment.Id}>
                            <td>{payment.InvoiceDate.nanoseconds}</td>
                            <td>{payment.Rate}</td>
                            <td>
                                <button onClick={() => paymentContract(payment.Id)} className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Pagar
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}