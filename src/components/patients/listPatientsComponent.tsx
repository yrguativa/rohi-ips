import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { StatusEnum } from "../../models/enums";
import PatientsCreatePage from "./patientsCreateComponent";
import { removePatientSave } from "../../store/slices/contract";

export default function ListPatientsPage() {
    const { ContractForm } = useAppSelector(state => state.contractFormSlice);
    const Patients = ContractForm?.Patients || [];
    const dispatch = useAppDispatch();
    const [IsOpenDialogCreatedPatient, setIsOpenDialogCreatedPatient] = useState(false);

    const onRemovePatient = (identification: string) => {
        dispatch(removePatientSave(identification));
    }
    const getPatientType = (typeId: number) => {
        switch (typeId) {
            case 1:
                return 'Pagador';
            case 2:
                return 'Beneficiario';
            case 3:
                return 'Pagador / Beneficiario';
        }
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Identification</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Nombres</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Dirección</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Tipo</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <button onClick={() => setIsOpenDialogCreatedPatient(nowState => !nowState)} type="button" className="rounded bg-primary p-3 font-medium text-gray mt-7" >
                            Crear Paciente
                        </button>
                    </div>
                </div>

                {
                    Patients.map(patient => (
                        <div key={patient.Identification} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                {patient.Identification}
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="font-medium text-black dark:text-white">{patient.Name}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="font-medium text-black dark:text-white">{patient.Address}</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="font-medium text-black dark:text-white">{getPatientType(patient.Type)}</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" type="button"
                                    onClick={() => onRemovePatient(patient.Identification!)}>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                                            fill="#ffffff" stroke="#ffffff"></path>
                                    </svg>
                                    Quitar
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                IsOpenDialogCreatedPatient &&
                <dialog open>
                    <div className="flex flex-row justify-end">
                        <button onClick={() => setIsOpenDialogCreatedPatient(false)}>X</button>
                    </div>
                    <PatientsCreatePage stateCreate={StatusEnum.Active} ></PatientsCreatePage>
                </dialog>
            }
        </>
    )
}