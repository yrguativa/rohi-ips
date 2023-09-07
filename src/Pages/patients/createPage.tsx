import { useForm } from "react-hook-form"
import { Patient, StatusEnum } from '../../models/interfaces/IContractState';
import { useAppDispatch } from "../../hooks/hooks";
import { createPatient } from "../../store/slices/contract";

type FormPatient = {
    Identification: string;
    Name: string;
    Address: string;
    Status: StatusEnum;
    Type: number;
};

export default function PatientsCreatePage() {
    const dispatch = useAppDispatch();
    const { register, getValues, formState: { errors }, reset } = useForm<FormPatient>();

    const onSubmitPatient = () => {
        const { Identification, Name, Address, Status, Type } = getValues();
        const patient: Patient = {
            Identification,
            Name,
            Address,
            Type,
            Status,
        }
        dispatch(createPatient(patient));
        reset({});
    }

    return (
        <div className="flex flex-row">
            <div className="mb-6 flex-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Identificación
                </label>
                <input id="Identification" type="number" placeholder="Fin de Contrato" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.Identification && " border-red-500 ")}
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
                <input id="Name" type="text" placeholder="Nombre Completo" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.Name && " border-red-500 ")}
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
                <input id="Address" type="text" placeholder="Dirección" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.Address && " border-red-500 ")}
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
            <div className="mb-6 flex-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Tipo de paciente
                </label>
                <select id="Type" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    + (errors.Type && " border-red-500 ")}
                    {...register("Type", {
                        value: 2,
                        required: {
                            value: true,
                            message: 'Tipo paciente es requerido'
                        },
                    })}>
                    <option value="2">Afiliado</option>
                    <option value="1">Cotizante</option>
                </select>
                {
                    errors.Type && <span className="text-red-500 text-xs italic">{errors.Type.message}</span>
                }
            </div>
            <div className="mb-6 flex-1/4 pl-1">
                <button type="button" className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onSubmitPatient} >
                    Agregar paciente
                </button>
            </div>
        </div>
    )
}

