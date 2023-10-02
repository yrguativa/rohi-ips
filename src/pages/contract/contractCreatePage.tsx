import { useForm, SubmitHandler } from "react-hook-form"

import { useState } from "react";
import PatientsCreatePage from "../patients/patientsCreatePage";
import ListPatientsPage from "../patients/listPatientsPage";
import { PaymentStatusEnum, StatusEnum } from "../../models/enums";
import { Contract } from "../../models/interfaces";
import { thunkCreatedContract } from "../../store/slices/contract";
import { useAppDispatch } from "../../hooks/hooks";

type FormContract = {
    Number: number;
    Email:string;
    Rate: number;
    Status: StatusEnum;
    DateStart: string;
    DateEnd: string;
    DateNextPayment: string;
};

export default function ContractCreatePage() {
    const dispatch = useAppDispatch();
    const [ToggleStatus, setToggleStatus] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormContract>({
        defaultValues: {
            Status: StatusEnum.Disabled
        }
    });

    const toggleStatusChange = () => {
        const status = (!ToggleStatus) ? StatusEnum.Active : StatusEnum.Disabled;
        setValue('Status', status);
        setToggleStatus(nowState => !nowState);
    };

    const onSubmit: SubmitHandler<FormContract> = data => {
        if (!data.Status) data.Status = StatusEnum.Disabled;

        const contract: Contract = {
            Number: data.Number.toString(),
            Status: data.Status,
            Rate: data.Rate,
            Email: data.Email,
            DateStart: new Date(data.DateStart).getTime(),
            DateEnd: new Date(data.DateStart).getTime(),
            Payments: [{
                Rate: data.Rate,
                InvoiceDate: new Date(data.DateNextPayment).getTime(),
                Status: PaymentStatusEnum.Pending
            }]
        }

        dispatch(thunkCreatedContract(contract));
        reset();
    }

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold text-black dark:text-white">
                    Crear Contrato
                </h2>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                <div className="flex flex-col gap-7.5">
                    <form onSubmit={handleSubmit(onSubmit)} >
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
                                Número de contrato
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
                                    required: {
                                        value: true,
                                        message: 'Tarifa es requerido'
                                    },
                                    min:{
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
                                errors.Rate && <span className="text-danger text-xs italic">{errors.Rate.message}</span>
                            }
                        </div>
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
                                errors.Rate && <span className="text-danger text-xs italic">{errors.Rate.message}</span>
                            }
                        </div>
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
                        </div >

                        <hr />
                        <h2 className="text-lg mt-3 mb-1">Pacientes</h2>
                        <PatientsCreatePage></PatientsCreatePage>
                        <ListPatientsPage></ListPatientsPage>
                        <div className="flex items-center justify-between mt-3">
                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-7" >
                                Crear Contrato
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

