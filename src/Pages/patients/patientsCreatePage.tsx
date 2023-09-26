import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../hooks/hooks";
import { Patient } from "../../models/interfaces";
import { StatusEnum } from "../../models/enums";
import { createPatientSave } from "../../store/slices/patient";

type FormPatient = {
    Identification: string;
    Name: string;
    Address: string;
    Status: StatusEnum;
    Type: number;
};

export default function PatientsCreatePage() {
    const dispatch = useAppDispatch();
    const { register, getValues, formState: { errors } } = useForm<FormPatient>();

    const onSubmitPatient = () => {
        const { Identification, Name, Address, Type } = getValues();
        const patient: Patient = {
            Identification,
            Name,
            Address,
            Type,
            Status: StatusEnum.Disabled,
        }
        dispatch(createPatientSave(patient));
    }

    return (
        <div className="flex flex-row">
            <div className="mb-6 flex-1/4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Identificación
                </label>
                <input id="Identification" type="number" placeholder="Fin de Contrato" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    + (errors.Identification && " border-danger ")}
                    {...register("Identification", {
                        value: "1071340342",
                        required: {
                            value: true,
                            message: 'Identificación del paciente es requerido'
                        },
                    })}>
                </input>
                {
                    errors.Identification && <span className="text-red-500 text-xs italic">{errors.Identification.message}</span>
                }
            </div>
            <div className="mb-6 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Nombre Completo
                </label>
                <input id="Name" type="text" placeholder="Nombre Completo" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    + (errors.Name && " border-danger ")}
                    {...register("Name", {
                        value: 'Andres Camilo Rodriguez Zapata',
                        required: {
                            value: true,
                            message: 'Nombre contrato es requerido'
                        },
                    })}>
                </input>
                {
                    errors.Name && <span className="text-red-500 text-xs italic">{errors.Name.message}</span>
                }
            </div>
            <div className="mb-6 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Dirección
                </label>
                <input id="Address" type="text" placeholder="Dirección" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    + (errors.Address && " border-danger ")}
                    {...register("Address", {
                        value: 'Calle 17 N 83 -9 Sur',
                        required: {
                            value: true,
                            message: 'Dirección contrato es requerido'
                        },
                    })}>
                </input>
                {
                    errors.Name && <span className="text-red-500 text-xs italic">{errors.Name.message}</span>
                }
            </div>
            <div className="mb-6 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Tipo de paciente
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select id="Type" className={"relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        + (errors.Type && " border-danger ")}
                        {...register("Type", {
                            value: 2,
                            required: {
                                value: true,
                                message: 'Tipo paciente es requerido'
                            },
                        })}>
                        <option value="2">Beneficiario</option>
                        <option value="1">Cotizante</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill=""></path>
                            </g>
                        </svg>
                    </span>
                </div>
                {
                    errors.Type && <span className="text-red-500 text-xs italic">{errors.Type.message}</span>
                }
            </div>
            <div className="mb-6 flex-1/4 pl-1">
                <button type="button" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-7"
                    onClick={onSubmitPatient} >
                    Agregar Paciente
                </button>
            </div>
        </div >
    )
}

