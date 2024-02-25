
import PatientsCreatePage from "./patientsCreateComponent";
import ListPatientsPage from "./listPatientsComponent";

export default function ContractCreatePage({ children }: Props) {

    return (
        <>
            <h2 className="text-lg mt-3 mb-1">Pacientes</h2>
            <PatientsCreatePage stateCreate={(!ToggleStatus) ? StatusEnum.Active : StatusEnum.Disabled} ></PatientsCreatePage>
            <ListPatientsPage></ListPatientsPage>
        </>
    );
}