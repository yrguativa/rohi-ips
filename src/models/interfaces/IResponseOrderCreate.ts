
export interface IResponseOrderCreate {
    id: number;
    status: string;
    external_reference: string;
    preference_id: string;
    collector: Collector;
    marketplace: string;
    date_created: string;
    last_updated: string;
    shipping_cost: number;
    total_amount: number;
    site_id: string;
    paid_amount: number;
    refunded_amount: number;
    payer: Collector;
    items: Item[];
    additional_info: string;
    application_id: number;
    order_status: string;
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

interface Collector {
    id: number;
}