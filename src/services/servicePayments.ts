import { v4 as uuidv4 } from 'uuid';
import { IMercadoPagoResponse } from '../models/interfaces/IMercadoPago';
import { STATUS_RESPONSE_FAILURE, STATUS_RESPONSE_PENDING, STATUS_RESPONSE_SUCCESS } from '../models/enums';
import { getEnvironments } from '../helpers/getEnviroments';

const {  VITE_MCPAGO_TOKEN, VITE_MCPAGO_NOTIFICATION_RESPONSE} = getEnvironments();



export async function CreatedOrder(idPayment: string, idClient: string, nameClient: string, paymentValue: number, month: string): Promise<IMercadoPagoResponse> {
    const orderData = {
        application_id: "510079169950085",
        site_id: "MCO",
        notification_url: "https://e720-190-237-16-208.sa.ngrok.io/webhook",
        back_urls: {
            success: `${VITE_MCPAGO_NOTIFICATION_RESPONSE}/${idPayment}/${STATUS_RESPONSE_SUCCESS}`,
            pending: `${VITE_MCPAGO_NOTIFICATION_RESPONSE}/${idPayment}/${STATUS_RESPONSE_PENDING}`,
            failure: `${VITE_MCPAGO_NOTIFICATION_RESPONSE}/${idPayment}/${STATUS_RESPONSE_FAILURE}`,
        },
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
        }
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${VITE_MCPAGO_TOKEN}`
        },
        body: JSON.stringify(orderData),
    });

    const responseBody: IMercadoPagoResponse = await response.json();

    return responseBody;
}