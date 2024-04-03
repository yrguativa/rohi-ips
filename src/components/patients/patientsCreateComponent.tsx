import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../hooks/hooks";
import { Patient } from "../../models/interfaces";
import { StatusEnum } from "../../models/enums";
import { createPatientSave } from "../../store/slices/patient";

type propsPage = {
    stateCreate: StatusEnum
}
type FormPatient = {
    Identification: string;
    Name: string;
    Address: string;
    BirthDate: number;
    CellPhone: number;
    City: number;
    EPS: number;
    Email: string;
    IdentificationType: number;
    Neighborhood: string;
    Phone: number;
    Status: StatusEnum;
    Type: number;
};

export default function PatientsCreatePage({ stateCreate }: propsPage) {
    const dispatch = useAppDispatch();
    const { register, getValues, formState: { errors } } = useForm<FormPatient>();

    const onSubmitPatient = () => {
        const { Identification, Name, Address, Type } = getValues();
        const patient: Patient = {
            Identification,
            Name,
            Address,
            Type,
            Status: stateCreate
        }
        dispatch(createPatientSave(patient));
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex flex-col mr-1">
                    <div className="mb-6 flex-1/4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Identificación
                        </label>
                        <input id="Identification" type="number" placeholder="Identificación" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.Identification && " border-danger ")}
                            {...register("Identification", {
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
                                required: {
                                    value: true,
                                    message: 'Dirección es requerida'
                                },
                            })}>
                        </input>
                        {
                            errors.Name && <span className="text-red-500 text-xs italic">{errors.Name.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Fecha de nacimiento
                        </label>
                        <input id="BirthDate" type="text" placeholder="Fecha de nacimiento" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.BirthDate && " border-danger ")}
                            {...register("BirthDate", {
                                required: {
                                    value: true,
                                    message: 'Fecha de nacimiento es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.BirthDate && <span className="text-red-500 text-xs italic">{errors.BirthDate.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Celular
                        </label>
                        <input id="CellPhone" type="text" placeholder="Celular" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.CellPhone && " border-danger ")}
                            {...register("CellPhone", {
                                required: {
                                    value: true,
                                    message: 'Celular es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.CellPhone && <span className="text-red-500 text-xs italic">{errors.CellPhone.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Ciudad
                        </label>
                        <input id="City" type="text" placeholder="Ciudad" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.Address && " border-danger ")}
                            {...register("City", {
                                required: {
                                    value: true,
                                    message: 'Ciudad es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.City && <span className="text-red-500 text-xs italic">{errors.City.message}</span>
                        }
                    </div>
                </div>
                <div className="flex flex-col ml-1">
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            EPS
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select id="EPS" className={"relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                + (errors.EPS && " border-danger ")}
                                {...register("EPS", {
                                    required: {
                                        value: true,
                                        message: 'EPS del paciente es requerido'
                                    },
                                })}>
                                <option value="0"></option>
                                <option value="1">NINGUNA</option>
                                <option value="2">Compensar  E.P.S.</option>
                                <option value="3">E.P.S. Famisanar LTDA. CAFAM-COLSUBSIDIO</option>
                                <option value="4">CONVIDA</option>
                                <option value="5">Nueva E.P.S.</option>
                                <option value="6">Salud Total S.A. E.P.S.</option>
                                <option value="7">Subsidiado</option>
                                <option value="8">E.P.S.  Sanitas S.A.</option>
                                <option value="9">E.P.S. servisalud</option>
                                <option value="10">SuSalud E.P.S. - (Suramericana)</option>
                                <option value="11">FF.MM.</option>
                                <option value="12">Medisalud</option>
                                <option value="13">SURA</option>
                                <option value="14">Solsalud S.A. E.P.S.</option>
                            </select>
                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.8">
                                        <path
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill=""></path>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        {
                            errors.EPS && <span className="text-red-500 text-xs italic">{errors.EPS.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Email
                        </label>
                        <input id="Email" type="text" placeholder="Email" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.Address && " border-danger ")}
                            {...register("Email", {
                                required: {
                                    value: true,
                                    message: 'Email es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.Email && <span className="text-red-500 text-xs italic">{errors.Email.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            IdentificationType
                        </label>
                        <input id="IdentificationType" type="text" placeholder="Tipo de identificación" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.IdentificationType && " border-danger ")}
                            {...register("IdentificationType", {
                                required: {
                                    value: true,
                                    message: 'Tipo de identificación es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.IdentificationType && <span className="text-red-500 text-xs italic">{errors.IdentificationType.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Barrio
                        </label>
                        <input id="Neighborhood" type="text" placeholder="Barrio" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.IdentificationType && " border-danger ")}
                            {...register("Neighborhood", {
                                required: {
                                    value: true,
                                    message: 'Barrio es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.Neighborhood && <span className="text-red-500 text-xs italic">{errors.Neighborhood.message}</span>
                        }
                    </div>
                    <div className="mb-6 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Telefono
                        </label>
                        <input id="Phone" type="text" placeholder="Telefono" className={"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            + (errors.IdentificationType && " border-danger ")}
                            {...register("Phone", {
                                required: {
                                    value: true,
                                    message: 'Telefono es requerido'
                                },
                            })}>
                        </input>
                        {
                            errors.Phone && <span className="text-red-500 text-xs italic">{errors.Phone.message}</span>
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
                                    required: {
                                        value: true,
                                        message: 'Tipo paciente es requerido'
                                    },
                                })}>
                                <option value="1">Pagador</option>
                                <option value="2">Beneficiario</option>
                                <option value="3">Pagador / Beneficiario</option>
                            </select>
                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.8">
                                        <path
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
                </div>
            </div>
            <div className="mb-6 flex-1/4">
                <button type="button" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-7"
                    onClick={onSubmitPatient} >
                    Agregar Paciente
                </button>
            </div>
        </div>
    )
}

