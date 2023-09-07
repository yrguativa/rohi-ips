import { useForm, SubmitHandler } from "react-hook-form"
import { StatusEnum } from '../../models/interfaces/IContractState';
import { useState } from "react";
import PatientsCreatePage from "../patients/createPage";
import ListPatients from "../patients/listPage";

type FormContract = {
    Number: number;
    Rate: number;
    Status: StatusEnum;
    DateStart: string;
    DateEnd: string;
    DateNextPayment: string;
};



export default function ContractCreatePage() {
    //const dispatch = useAppDispatch();
    const [ToggleStatus, setToggleStatus] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormContract>();

    const toggleStatusChange = () => {
        const status = (!ToggleStatus) ? StatusEnum.Active : StatusEnum.Disabled;
        setValue('Status', status);
        setToggleStatus(nowState => !nowState);
    };

    const onSubmit: SubmitHandler<FormContract> = data => {
        console.log(data);
        // dispatch(thunkLogin(data.email, data.password));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Número de contrato
                </label>
                <input id="Number" type="text" placeholder="Numero" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.Number && " border-red-500 ")}
                    {...register("Number", {
                        value: 1101,
                        required: {
                            value: true,
                            message: 'Número de contrato es requerido'
                        }
                    })}>
                </input>
                {
                    errors.Number && <p className="text-red-500 text-xs italic">{errors.Number.message}</p>
                }
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Tarifa
                </label>
                <input id="Rate" type="number" placeholder="Tarifa" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.Rate && " border-red-500 ")}
                    {...register("Rate", {
                        value: 10,
                        required: {
                            value: true,
                            message: 'Tarifa es requerido'
                        }
                    })}>
                </input>
                {
                    errors.Rate && <span className="text-red-500 text-xs italic">{errors.Rate.message}</span>
                }
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Fecha Inicio Contrato
                </label>
                <input id="DateStart" type="date" placeholder="Inicio Contrato" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.DateStart && " border-red-500 ")}
                    {...register("DateStart", {
                        value: '2023-09-01',
                        required: {
                            value: true,
                            message: 'Fecha Inicio Contrato es requerido'
                        },
                    })}>
                </input>
                {
                    errors.DateStart && <span className="text-red-500 text-xs italic">{errors.DateStart.message}</span>
                }
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Fecha fin de contrato
                </label>
                <input id="DateEnd" type="date" placeholder="Fin de Contrato" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.DateEnd && " border-red-500 ")}
                    {...register("DateEnd", {
                        value: '2024-09-01',
                        required: {
                            value: true,
                            message: 'Fecha fin de contrato es requerido'
                        },
                    })}>
                </input>
                {
                    errors.Rate && <span className="text-red-500 text-xs italic">{errors.Rate.message}</span>
                }
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Fecha siguiente pago
                </label>
                <input id="DateNextPayment" type="date" placeholder="Fin de Contrato" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.DateNextPayment && " border-red-500 ")}
                    {...register("DateNextPayment", {
                        value: '2024-10-01',
                        required: {
                            value: true,
                            message: 'Fecha fin de contrato es requerido'
                        },
                    })}>
                </input>
                {
                    errors.Rate && <span className="text-red-500 text-xs italic">{errors.Rate.message}</span>
                }
            </div>
            <div className="mb-6"  >
                <label htmlFor="toggleStatus" className="flex cursor-pointer select-none items-center"  >
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

            <PatientsCreatePage></PatientsCreatePage>
            <ListPatients></ListPatients>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Crear Contrato
                </button>
            </div>

        </form >
    )
}

