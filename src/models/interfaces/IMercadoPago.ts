export interface IMercadoPagoResponse {
    additional_info: string;
    auto_return: string;
    back_urls: Backurls;
    binary_mode: boolean;
    client_id: string;
    collector_id: number;
    date_created: string;
    expires: boolean;
    external_reference: string;
    id: string;
    init_point: string;
    items: Item[];
    marketplace: string;
    marketplace_fee: number;
    metadata: Metadata;
    notification_url: string;
    operation_type: string;
    payer: Payer;
    redirect_urls: Backurls;
    sandbox_init_point: string;
    site_id: string;
    shipments: Shipments;
}

interface Shipments {
    receiver_address: Receiveraddress;
}

interface Receiveraddress {
    zip_code: string;
    street_name: string;
    floor: string;
    apartment: string;
}

interface Payer {
    phone: Phone;
    address: Address;
    email: string;
    identification: Identification;
    name: string;
    surname: string;
}

interface Identification {
    number: string;
    type: string;
}

interface Address {
    zip_code: string;
    street_name: string;
}

interface Phone {
    area_code: string;
    number: string;
}

interface Metadata {
}

interface Item {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    picture_url: string;
    title: string;
    quantity: number;
    unit_price: number;
}

interface Backurls {
    failure: string;
    pending: string;
    success: string;
}