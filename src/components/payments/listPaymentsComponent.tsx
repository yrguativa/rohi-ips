import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { editInvoiceNumber } from "../../store/slices/contract";
import { PaymentStatusEnum } from "../../models/enums";
import { naturalDay, numberFormat } from "../../utils/utilsDate";
import { PaymentInvoiceContract, paymentInvoiceSchema } from "../../validations/paymentInvoiceValidations";

export default function ListPaymentsPage() {
    const { roles } = useAppSelector(state => state.userAuthState);
    const { ContractForm } = useAppSelector(state => state.contractFormSlice);
    const dispatch = useAppDispatch();
    const payments = ContractForm?.Payments || [];
    const [IsOpenDialogCreatedPatient, setIsOpenDialogInvoiceNumber] = useState(false);
    const [idPaymentEdit, setIdPaymentEdit] = useState<string | undefined>();
    const { register, getValues, setValue, formState: { errors } } = useForm<PaymentInvoiceContract>({
        resolver: zodResolver(paymentInvoiceSchema),
        mode: 'onChange',
    });
    const [errorFormSubmit, setErrorFormSubmit] = useState<ZodError>();

    const onSubmitPatient = () => {
        try {
            const formValue = getValues();
            paymentInvoiceSchema.parse(formValue);
            
            dispatch(editInvoiceNumber({ idPay: idPaymentEdit!, invoice: formValue.NumberInvoice }));
            setIsOpenDialogInvoiceNumber(false);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorFormSubmit(error);
            }
        }
    }
    return (
        <>
            <div className="flex flex-col">
                <div className={"grid rounded-sm bg-gray-2 dark:bg-meta-4 " +
                    ((roles?.isAdmin || roles?.isAccountant) ? "sm:grid-cols-6" : "sm:grid-cols-5")}>
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Estado</h5>
                    </div>

                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Valor</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Fecha Facturada</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Fecha pago</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Número de Factura</h5>
                    </div>
                    {

                        (roles?.isAdmin || roles?.isAccountant) && <div className="p-2.5 text-center sm:block xl:p-5"></div>
                    }

                </div>
                {
                    payments.map(pay => (
                        <div key={pay.Id} className={"grid border-b border-stroke dark:border-strokedark " +
                            ((roles?.isAdmin || roles?.isAccountant) ? "sm:grid-cols-6" : "sm:grid-cols-5")}>
                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                {
                                    pay.Status !== PaymentStatusEnum.Approved &&
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                        Pendiente
                                    </p>
                                }
                                {
                                    pay.Status === PaymentStatusEnum.Approved &&
                                    <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                        Realizado
                                    </p>
                                }
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="font-medium text-black dark:text-white">$ {numberFormat(pay.Rate, 0)}</p>
                            </div>

                            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="font-medium text-black dark:text-white">{naturalDay(pay.InvoiceDate / 1000)}</p>
                            </div>
                            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="font-medium text-black dark:text-white">{pay.PaymentDate && naturalDay(pay.PaymentDate / 1000)}</p>
                            </div>

                            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="font-medium text-black dark:text-white">{pay.NumberInvoiceRohi}</p>
                            </div>

                            {
                                (roles?.isAdmin) &&
                                <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                                    <button type="button" className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:text-primary"
                                        onClick={() => {
                                            setIsOpenDialogInvoiceNumber(nowState => !nowState);
                                            setIdPaymentEdit(pay.Id);
                                            if (pay.NumberInvoiceRohi && pay.NumberInvoiceRohi.length > 0) {
                                                setValue("NumberInvoice", pay.NumberInvoiceRohi)
                                            }
                                        }} >
                                        <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z" />
                                            </g>
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>

            {
                IsOpenDialogCreatedPatient &&
                <div x-show="popupOpen" className="fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
                        <button onClick={() => setIsOpenDialogInvoiceNumber(false)} className="absolute right-1 top-1 sm:right-5 sm:top-5">
                            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z" fill=""></path>
                            </svg>
                        </button>
                        <div className="mb-6">
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="DateStart">
                                Fecha Inicio Contrato
                            </label>
                            <input id="DateStart" type="text" placeholder="Número de factura" className={"custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                + (errors.NumberInvoice && " border-danger ")}
                                {...register("NumberInvoice", {
                                    required: {
                                        value: true,
                                        message: 'El numero de la factura es requerido'
                                    },
                                })}>
                            </input>
                            {
                                errors.NumberInvoice && <span className="text-danger text-xs italic">{errors.NumberInvoice.message}</span>
                            }
                        </div>

                        {
                            errorFormSubmit && <div className="border rounded border-danger border-l-4 p-2 font-bold text-sm text-danger ">
                                <ul>
                                    {
                                        errorFormSubmit.issues.map(is => {
                                            return (<li key={is.code + is.path.join()} title={is.path.join()} > ❌ {is.message}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                        }

                        <div className="mb-6 flex-1/4">
                            <button type="button" className="flex w-full justify-center rounded bg-primary disabled:bg-stroke p-3 font-medium text-gray disabled:text-black mt-7"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onSubmitPatient();
                                }}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}