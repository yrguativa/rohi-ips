import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListPatientsComponent from "../../components/patients/listPatientsComponent";
import { PaymentStatusEnum, StatusEnum } from "../../models/enums";
import { Contract } from "../../models/interfaces";
import { cleanContractForm, thunkCreatedContract, thunkGetContract } from "../../store/slices/contract";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { DateAddMonths, dateToString, stringToStamp, timesStampToString } from "../../utils/utilsDate";
import ListPaymentsPage from "../../components/payments/listPaymentsComponent";

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
    const { ContractForm } = useAppSelector(state => state.contractFormSlice);
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormContract>({
        defaultValues: {
            Status: StatusEnum.Disabled
        }
    });

    // load events
    const [searchParams] = useSearchParams();
    const idContract = searchParams.get('idContract');
    useEffect(() => {
        if (idContract && idContract !== undefined && idContract !== '') {
            dispatch(thunkGetContract(idContract!))
        } else {
            dispatch(cleanContractForm())
        }
    }, [idContract, dispatch])

    const loadFormContractForm = () => {
        if (idContract && idContract !== undefined && idContract !== '' &&
            ContractForm && !isNaN(parseInt(ContractForm.Number!))) {
            setValue('Number', parseInt(ContractForm.Number!))
            setValue('Email', ContractForm.Email!)
            setValue('Rate', ContractForm.Rate!)
            setValue('DateStart', timesStampToString(ContractForm.DateStart!))
            if (ContractForm.DateEnd) {
                setValue('DateEnd', timesStampToString(ContractForm.DateEnd))
            }

            const status = ToggleStatus ? StatusEnum.Active : StatusEnum.Disabled;
            if (ContractForm.Status !== status) {
                toggleStatusChange()
            }

            const paymentLast = (ContractForm?.Payments && ContractForm?.Payments?.length > 0) ? ContractForm.Payments[ContractForm?.Payments?.length - 1] : undefined
            if (paymentLast && paymentLast.Status == PaymentStatusEnum.Pending && paymentLast.InvoiceDate !== undefined) {
                setValue('DateNextPayment', timesStampToString(paymentLast.InvoiceDate!))
            } else if (paymentLast && paymentLast.Status == PaymentStatusEnum.Approved && paymentLast.InvoiceDate !== undefined) {
                const paymentDate = new Date(paymentLast.InvoiceDate!)
                const nextPaymentDate = DateAddMonths(paymentDate, 1)
                setValue('DateNextPayment', dateToString(nextPaymentDate))
            } else {
                const paymentDate = new Date(ContractForm.DateStart!)
                const nextPaymentDate = DateAddMonths(paymentDate, 1)
                setValue('DateNextPayment', dateToString(nextPaymentDate))
            }
        }
    }
    useEffect(() => {
        loadFormContractForm();
    }, [ContractForm])

    // events of components
    const [ToggleStatus, setToggleStatus] = useState(false);
    const toggleStatusChange = () => {
        const status = (!ToggleStatus) ? StatusEnum.Active : StatusEnum.Disabled;
        setValue('Status', status);
        setToggleStatus(nowState => !nowState);
    }
    const [showPatientsNotification, setShowPatientsNotification] = useState(false);

    const onSubmit: SubmitHandler<FormContract> = data => {
        if (!ContractForm?.Patients) {
            setShowPatientsNotification(true);
            setTimeout(() => {
                setShowPatientsNotification(false);
            }, 10000);
            return;
        }
        if (!data.Status) data.Status = StatusEnum.Disabled;

        const contract: Contract = {
            Number: data.Number.toString(),
            Status: data.Status,
            Rate: data.Rate,
            Email: data.Email,
            DateStart: stringToStamp(data.DateStart),
            DateEnd: stringToStamp(data.DateEnd),
        }
        if (ContractForm && ContractForm.Patients && ContractForm.Patients.length > 0) {
            contract.Patients = [...ContractForm.Patients]

        }
        if (ContractForm && ContractForm?.Payments && ContractForm.Payments.length > 0) {
            contract.Payments = [...ContractForm!.Payments!]
        }
        if (ContractForm?.Payments) {
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
    }

    return (
        <>
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
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="Number">
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
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="Email">
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
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="Rate">
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
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="DateStart">
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
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="DateEnd">
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
                                <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="DateNextPayment">
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
                            <label className="mb-3 block font-medium text-sm text-black dark:text-white" htmlFor="toggleStatus">
                                Estado
                            </label>
                            <label htmlFor="toggleStatus" className="flex cursor-pointer select-none items-center">
                                <div className="relative">
                                    <input type="checkbox" id="toggleStatus" className="sr-only" onClick={toggleStatusChange} />
                                    <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                                    <div className={"absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition " +
                                        (ToggleStatus && '!right-1 !translate-x-full !bg-primary !bg-blue-500 dark:!bg-white')}>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div
                    className="rounded-sm border border-stroke bg-white p-4 mt-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                    <div className="flex flex-col gap-7.5">
                        <h2 className="text-xlg mt-3 mb-1">Pacientes</h2>
                        <ListPatientsComponent></ListPatientsComponent>
                    </div>
                </div>

                <div
                    className="rounded-sm border border-stroke bg-white p-4 mt-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                    <div className="flex flex-col gap-7.5">
                        <h2 className="text-xlg mt-3 mb-1">Pagos</h2>
                        <ListPaymentsPage></ListPaymentsPage>
                    </div>
                </div>


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
            {
                showPatientsNotification &&
                <div className="fixed bottom-8 right-8 max-w-[490px] rounded-lg border border-[#F5C5BB] bg-[#FCEDEA] py-4 pl-4 pr-5.5 shadow-2 dark:border-[#EA4E2C] dark:bg-[#1B1B24]">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-grow items-center gap-5">
                            <div className="flex h-15 w-full max-w-15 items-center justify-center rounded-md bg-[#EA4E2C]">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.2021 3.33462C14.7513 3.02546 15.3708 2.86304 16.001 2.86304C16.6312 2.86304 17.2507 3.02546 17.7999 3.33462C18.349 3.64379 18.8092 4.08926 19.136 4.62807L19.1389 4.63282L30.4322 23.4862L30.4403 23.5C30.7605 24.0544 30.9299 24.683 30.9317 25.3233C30.9335 25.9635 30.7676 26.593 30.4505 27.1493C30.1335 27.7055 29.6763 28.169 29.1245 28.4937C28.5727 28.8184 27.9455 28.9929 27.3053 29L27.2943 29.0001L4.69668 29C4.05647 28.993 3.42928 28.8184 2.87748 28.4937C2.32568 28.169 1.86851 27.7055 1.55146 27.1493C1.23441 26.593 1.06853 25.9635 1.07033 25.3233C1.07212 24.683 1.24152 24.0544 1.56168 23.5L1.5698 23.4862L12.8631 4.63282L13.721 5.1467L12.866 4.62807C13.1928 4.08926 13.653 3.64379 14.2021 3.33462ZM14.5773 5.6632C14.5769 5.66391 14.5764 5.66462 14.576 5.66532L3.29013 24.5062C3.14689 24.7567 3.07113 25.0402 3.07032 25.3289C3.0695 25.6199 3.1449 25.906 3.28902 26.1589C3.43313 26.4117 3.64093 26.6224 3.89175 26.77C4.14117 26.9167 4.42447 26.996 4.71376 27H27.2882C27.5775 26.996 27.8608 26.9167 28.1103 26.77C28.3611 26.6224 28.5689 26.4117 28.713 26.1589C28.8571 25.906 28.9325 25.6199 28.9317 25.3289C28.9309 25.0402 28.8551 24.7567 28.7119 24.5062L17.426 5.66532C17.4256 5.66462 17.4251 5.66391 17.4247 5.6632C17.2762 5.41924 17.0676 5.21752 16.8187 5.07739C16.5691 4.93686 16.2875 4.86304 16.001 4.86304C15.7146 4.86304 15.4329 4.93686 15.1833 5.07739C14.9345 5.21752 14.7258 5.41924 14.5773 5.6632Z" fill="white"></path>
                                    <path d="M16 11C16.5523 11 17 11.4477 17 12V17.3333C17 17.8856 16.5523 18.3333 16 18.3333C15.4477 18.3333 15 17.8856 15 17.3333V12C15 11.4477 15.4477 11 16 11Z" fill="white"></path>
                                    <path d="M15 22.6666C15 22.1143 15.4477 21.6666 16 21.6666H16.0133C16.5656 21.6666 17.0133 22.1143 17.0133 22.6666C17.0133 23.2189 16.5656 23.6666 16.0133 23.6666H16C15.4477 23.6666 15 23.2189 15 22.6666Z" fill="white"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="mb-0.5 text-title-xsm font-medium text-black dark:text-[#EA4E2C]">
                                    No hay pacientes!
                                </h4>
                                <p className="text-sm font-medium">
                                    No se puede guardar el contrato sin pacientes, debe tener minimo un paciente.
                                </p>
                            </div>
                        </div>

                        <div>
                            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md bg-white dark:bg-meta-4">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.854423 0.85186C1.2124 0.493879 1.79281 0.493879 2.15079 0.85186L7.0026 5.70368L11.8544 0.85186C12.2124 0.493879 12.7928 0.493879 13.1508 0.85186C13.5088 1.20984 13.5088 1.79024 13.1508 2.14822L8.29897 7.00004L13.1508 11.8519C13.5088 12.2098 13.5088 12.7902 13.1508 13.1482C12.7928 13.5062 12.2124 13.5062 11.8544 13.1482L7.0026 8.2964L2.15079 13.1482C1.79281 13.5062 1.2124 13.5062 0.854423 13.1482C0.496442 12.7902 0.496442 12.2098 0.854423 11.8519L5.70624 7.00004L0.854423 2.14822C0.496442 1.79024 0.496442 1.20984 0.854423 0.85186Z" fill="#637381"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

