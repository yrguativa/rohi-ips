import { v4 as uuidv4 } from 'uuid';
import { IResponseOrderCreate } from '../models/interfaces';


const accessToken = 'TEST-510079169950085-090518-9769b59baabead9c751e5994dff07ee8-1465594705';

export async function CreatedOrder(idPayment: string, idClient: string, nameClient: string, paymentValue: number, month: string): Promise<IResponseOrderCreate> {
    const orderData = {
        application_id: "510079169950085",
        site_id: "MCO",
        external_reference: uuidv4() + '#' + idPayment,
        items: [
            {
                title: "ROHI IPS SAS",
                description: `Pago del mes ${month} de ROHI IPS SAS`,
                picture_url: "https://mla-s2-p.mlstatic.com/907762-MLA50120094671_052022-O.jpg",
                id: idPayment,
                unit_price: paymentValue,
                quantity: 1,
                currency_id: "COP",
            }
        ],
        payer: {
            id: idClient,
            nickname: nameClient
        },
        shipping: {
            receiver_address: {
                zip_code: '1234',
                street_name: 'Main St',
                street_number: '123'
            }
        }
    };

    const response = await fetch("https://api.mercadopago.com/merchant_orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(orderData),
    });

    const responseBody: IResponseOrderCreate = await response.json();

    return responseBody;
}