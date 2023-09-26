import { useEffect } from "react";
import humanize from 'humanize';

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { thunkPayment } from "../../store/slices/client";
import { thunkLoadContract } from "../../store/slices/contract";
import { PaymentStatusEnum, StatusEnum } from "../../models/enums";


export default function ClientHomePage() {
    const dispatch = useAppDispatch();
    const { contractState: { Contract }, userAuthState: { status } } = useAppSelector(state => state);

    useEffect(() => {
        dispatch(thunkLoadContract());
    }, [dispatch, status]);

    const paymentContract = (idPayment: string) => {
        dispatch(thunkPayment(idPayment))
    };

    return (
        <div
            className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark m-10  md:p-6 xl:p-9">
            <div className="flex flex-col gap-7.5">
                {Contract?.Status == StatusEnum.Disabled && (<div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
                    <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                                fill="#FBBF24"></path>
                        </svg>
                    </div>
                    <div className="w-full">
                        <h5 className="mb-3 text-lg font-bold text-[#9D5425]">
                            Cuenta Inactiva
                        </h5>
                        <p className="leading-relaxed text-[#D0915C]">
                            No se ha reportado el pago de Home ROHI, es necesario realizar el pago para volver a tener tus servicios activos
                        </p>
                    </div>
                </div>)}


                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Fecha de pago oportuno</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Valor</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Estado del pago</h5>
                        </div>
                    </div>

                    {
                        Contract && Contract?.Payments?.map(payment => (
                            <div key={payment.Id} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="font-medium text-black dark:text-white">
                                        {/* {humanize.date('Y-m-d', (new Date(payment.InvoiceDate)))} */}
                                        {
                                            humanize.naturalDay(payment.InvoiceDate! / 1000)
                                        }
                                    </p>
                                </div>
                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="font-medium text-meta-3">$ {humanize.numberFormat(payment.Rate, 0)}</p>
                                </div>
                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    {
                                        payment.Status === PaymentStatusEnum.Approved ? (
                                            <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                                Pago Realizado
                                            </p>
                                        ) : (
                                            <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                                Pendiente de pago
                                            </p>
                                        )
                                    }
                                </div>
                                {
                                    payment.Status !== PaymentStatusEnum.Approved && (
                                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                            <button onClick={() => paymentContract(payment.Id!)} className="inline-flex items-center justify-center rounded-md border border-meta-3 py-4 px-10 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10" type="button">
                                                Pagar
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}