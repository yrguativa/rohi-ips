export default function UserHome() {
    const loginGoogle = () => {

    };

    return (
        <table className="table-fixe">
            <thead>
                <tr>
                    <th>Pago</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>31/08/2023</td>
                    <td>Malcolm Lockyer</td>
                    <td>
                        <button onClick={loginGoogle} className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Pagar
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>1972</td>
                </tr>
                <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                </tr>
            </tbody>
        </table>
    )
}