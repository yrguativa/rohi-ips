import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListPatientsPage from "../../components/patients/listPatientsComponent";
import { PaymentStatusEnum, StatusEnum } from "../../models/enums";
import { Contract } from "../../models/interfaces";
import { thunkCreatedContract, thunkGetContract } from "../../store/slices/contract";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { DateAddMonths, dateToString, stringToStamp, timesStampToString } from "../../utils/utilsDate";
import { cleanPatientsSave } from "../../store/slices/patient";
import ListPaymentsPage from "../../components/payments/listPaymentsComponent";
import { Payment } from '../../models/interfaces/IContractState';

type FormContract = {
    Number: number;
    Email: string;
    Rate: number;
    Status: StatusEnum;
    DateStart: string;
    DateEnd: string;
    DateNextPayment: string;
};

export default function ContractCreatePage() {
    const dispatch = useAppDispatch();
    const { contractState: { Contract: ContractUpdate } } = useAppSelector(state => state);
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormContract>({
        defaultValues: {
            Status: StatusEnum.Disabled
        }
    });

    // load events
    const [searchParams] = useSearchParams();
    const idContract = searchParams.get('idContract');
    const [payments, setPayments] = useState([] as Payment[]);
    useEffect(() => {
        if (idContract && idContract !== undefined && idContract !== '') {
            dispatch(thunkGetContract(idContract!))
        } else {
            dispatch(cleanPatientsSave())
        }
    }, [])

    const loadFormContractUpdate = () => {
        if (idContract && idContract !== undefined && idContract !== '' &&
            ContractUpdate && !isNaN(parseInt(ContractUpdate.Number!))) {
            console.log("🚀 ~ useEffect ~ ContractUpdate:", ContractUpdate)
            if (ContractUpdate.Payments) {
                setPayments(ContractUpdate?.Payments)
            }
            setValue('Number', parseInt(ContractUpdate.Number!))
            setValue('Email', ContractUpdate.Email!)
            setValue('Rate', ContractUpdate.Rate!)
            setValue('DateStart', timesStampToString(ContractUpdate.DateStart!))
            setValue('DateEnd', timesStampToString(ContractUpdate.DateEnd!))

            const status = ToggleStatus ? StatusEnum.Active : StatusEnum.Disabled;
            if (ContractUpdate.Status !== status) {
                toggleStatusChange()
            }

            const paymentLast = (ContractUpdate?.Payments && ContractUpdate?.Payments?.length > 0) ? ContractUpdate.Payments[ContractUpdate?.Payments?.length - 1] : undefined
            if (paymentLast && paymentLast.Status == PaymentStatusEnum.Pending && paymentLast.InvoiceDate !== undefined) {
                setValue('DateNextPayment', timesStampToString(paymentLast.InvoiceDate!))
            } else if (paymentLast && paymentLast.Status == PaymentStatusEnum.Approved && paymentLast.InvoiceDate !== undefined) {
                const paymentDate = new Date(paymentLast.InvoiceDate!)
                const nextPaymentDate = DateAddMonths(paymentDate, 1)
                setValue('DateNextPayment', dateToString(nextPaymentDate))

            } else {
                const paymentDate = new Date(ContractUpdate.DateStart!)
                const nextPaymentDate = DateAddMonths(paymentDate, 1)
                setValue('DateNextPayment', dateToString(nextPaymentDate))
            }
        }
    }
    useEffect(() => {
        loadFormContractUpdate();
    }, [ContractUpdate])

    // events of components
    const [ToggleStatus, setToggleStatus] = useState(false);
    const toggleStatusChange = () => {
        const status = (!ToggleStatus) ? StatusEnum.Active : StatusEnum.Disabled;
        setValue('Status', status);
        setToggleStatus(nowState => !nowState);
    }

    const onSubmit: SubmitHandler<FormContract> = data => {
        if (!data.Status) data.Status = StatusEnum.Disabled;


        const contract: Contract = {
            Number: data.Number.toString(),
            Status: data.Status,
            Rate: data.Rate,
            Email: data.Email,
            DateStart: stringToStamp(data.DateStart),
            DateEnd: stringToStamp(data.DateEnd),
        }
        if (idContract && idContract !== undefined && idContract !== '') {
            contract.Payments = [...payments];
        } else {
            contract.Payments = [
                {
                    Rate: data.Rate,
                    InvoiceDate: stringToStamp(data.DateNextPayment),
                    Status: PaymentStatusEnum.Pending
                }
            ]
        }

        dispatch(thunkCreatedContract(contract));
        reset();
        setPayments([])
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold text-black dark:text-white">
                    {idContract == null ? 'Crear Contrato' : 'Actualizar Contrato'}
                </h2>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                <div className="flex flex-col gap-7.5">
                    <div className="mb-4">
                        <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="username">
                            Número de contrato
                        </label>
                        <input id="Number" type="text" placeholder="Numero" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.Number && " border-danger ")}
                            {...register("Number", {
                                required: {
                                    value: true,
                                    message: 'Número de contrato es requerido'
                                }
                            })}>
                        </input>
                        {
                            errors.Number && <p className="text-danger text-xs italic">{errors.Number.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="username">
                            Email
                        </label>
                        <input id="Email" type="email" placeholder="Email" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.Email && " border-danger ")}
                            {...register("Email", {
                                required: {
                                    value: true,
                                    message: 'El email de contrato es requerido'
                                }
                            })}>
                        </input>
                        {
                            errors.Number && <p className="text-danger text-xs italic">{errors.Number.message}</p>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="password">
                            Tarifa
                        </label>
                        <input id="Rate" type="number" placeholder="Tarifa" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.Rate && " border-danger ")}
                            {...register("Rate", {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: 'Tarifa es requerido'
                                },
                                min: {
                                    value: 2000,
                                    message: 'El minimo valor para el campo tarifa es $2.000'
                                }
                            })}>
                        </input>
                        {
                            errors.Rate && <span className="text-danger text-xs italic">{errors.Rate.message}</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="password">
                            Fecha Inicio Contrato
                        </label>
                        <input id="DateStart" type="date" placeholder="Inicio Contrato" className={"custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.DateStart && " border-danger ")}
                            {...register("DateStart", {
                                required: {
                                    value: true,
                                    message: 'Fecha Inicio Contrato es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.DateStart && <span className="text-danger text-xs italic">{errors.DateStart.message}</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="password">
                            Fecha fin de contrato
                        </label>
                        <input id="DateEnd" type="date" placeholder="Fin de Contrato" className={"custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.DateEnd && " border-danger ")}
                            {...register("DateEnd", {
                                required: {
                                    value: true,
                                    message: 'Fecha fin de contrato es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.DateEnd && <span className="text-danger text-xs italic">{errors.DateEnd.message}</span>
                        }
                    </div>
                    {
                        (idContract === undefined || idContract === null || idContract === '') &&
                        <div className="mb-6">
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="password">
                                Fecha siguiente pago
                            </label>
                            <input id="DateNextPayment" type="date" placeholder="Fin de Contrato" className={"custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                + (errors.DateNextPayment && " border-danger ")}
                                {...register("DateNextPayment", {
                                    required: {
                                        value: true,
                                        message: 'Fecha fin de contrato es requerido'
                                    },
                                })}>
                            </input>
                            {
                                errors.DateNextPayment && <span className="text-danger text-xs italic">{errors.DateNextPayment.message}</span>
                            }
                        </div>
                    }
                    <div className="mb-6"  >
                        <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="password">
                            Estado
                        </label>
                        <label htmlFor="toggleStatus" className="flex cursor-pointer select-none items-center">
                            <div className="relative">
                                <input type="checkbox" id="toggleStatus" className="sr-only" onClick={toggleStatusChange} />
                                <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                                {/* <div className={"absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition" +
                            (ToggleStatus && '!right-1 !translate-x-full !bg-primary !bg-blue-500 dark:!bg-white')}></div> */}
                                <div className={"absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition" +
                                    (ToggleStatus && '!right-1 !translate-x-full !bg-primary !bg-lime-500')}></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white p-4 mt-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                <div className="flex flex-col gap-7.5">
                    <h2 className="text-xlg mt-3 mb-1">Pacientes</h2>
                    <ListPatientsPage></ListPatientsPage>
                </div>
            </div>

            {
                (payments && payments.length > 0) && <div
                    className="rounded-sm border border-stroke bg-white p-4 mt-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                    <div className="flex flex-col gap-7.5">
                        <h2 className="text-xlg mt-3 mb-1">Pagos</h2>
                        <ListPaymentsPage payments={payments}></ListPaymentsPage>
                    </div>
                </div>
            }

            <div className="p-8 pt-2">
                <div className="flex items-center justify-between">
                    {
                        idContract == null ?
                            (
                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-7" >
                                    Crear Contrato
                                </button>
                            ) :
                            (
                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-7" >
                                    Actualizar Contrato
                                </button>
                            )
                    }
                </div>
            </div>
        </form>
    );
}

