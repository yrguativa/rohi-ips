import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { thunkAllLoadPatients } from "../../store/slices/patient";
import { StatusEnum } from "../../models/enums";

export default function UserHomePage() {
    const dispatch = useAppDispatch();
    const { patientState: { Patients }, userAuthState: { status } } = useAppSelector(state => state);

    useEffect(() => {
        dispatch(thunkAllLoadPatients());
    }, [dispatch, status]);

    return (
        <div
            className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark m-10  md:p-6 xl:p-9">
            <div className="flex flex-col gap-7.5">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Identificación</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Nombres</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Dirección</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Contrato</h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">Estado</h5>
                        </div>
                    </div>

                    {
                        Patients.map(patient => (
                            <div key={patient.Identification} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="font-medium text-black dark:text-white">{patient.Identification}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="font-medium text-black dark:text-white">{patient.Name}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="font-medium text-black dark:text-white">{patient.Address}</p>
                                </div>
                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="font-medium text-black dark:text-white">{patient.Contract}</p>
                                </div>
                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    {
                                        patient.Status === StatusEnum.Active ? (
                                            <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                                Activo
                                            </p>
                                        ) : (
                                            <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                                Inactivo
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}