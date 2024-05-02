import { PaymentStatusEnum } from "../../models/enums";
import { Payment } from "../../models/interfaces";
import { naturalDay, numberFormat } from "../../utils/utilsDate";

type listPaymentsProp = {
    payments: Payment[]
}
export default function ListPaymentsPage({ payments }: listPaymentsProp) {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">Estado</h5>
                </div>

                <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">Valor</h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">Fecha Facturada</h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">Fecha pago</h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">Número de Factura</h5>
                </div>
            </div>

            {
                payments.map(pay => (
                    <div key={pay.Id} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            {
                                pay.Status !== PaymentStatusEnum.Approved &&
                                <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                    Pendiente
                                </p>
                            }
                            {
                                pay.Status === PaymentStatusEnum.Approved &&
                                <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                    Realizado
                                </p>
                            }
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="font-medium text-black dark:text-white">$ {numberFormat(pay.Rate, 0)}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="font-medium text-black dark:text-white">{naturalDay(pay.InvoiceDate / 1000)}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="font-medium text-black dark:text-white">{ pay.PaymentDate && naturalDay(pay.PaymentDate / 1000)}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="font-medium text-black dark:text-white">{ pay.NumberInvoiceRohi}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}