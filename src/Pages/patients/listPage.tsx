import { useAppSelector } from "../../hooks/hooks";

export default function ListPatients() {
    const { Contract } = useAppSelector(state => state.contractState);

    return (
        <>
            <h3>Pacientes</h3>
            <table className="table-fixe">
                <thead>
                    <tr>
                        <th>Identification</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Tipo</th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Contract?.Patients.map(payment => (
                            <tr key={payment.Identification}>
                                <td>{payment.Identification}</td>
                                <td>{payment.Name}</td>
                                <td>{payment.Address}</td>
                                <td>{payment.Type == 1 ? 'Cotizante' : 'Afiliado'}</td>
                                <td>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        Quitar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}