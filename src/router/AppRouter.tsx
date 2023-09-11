import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

import RegisterPage from '../pages/auth/registerPage';
import LoginPage from '../pages/auth/loginPage';
import ContractCreatePage from '../pages/contract/createPage';
import UserHomePage from '../pages/userHome/userHomePage';
import ClientHomePage from '../pages/clientHome/clientHomePage';
import ResponsePaymentPage from '../pages/response/responsePaymentPage';

export const AppRouter = () => {
    const { status } = useAppSelector(state => state.userAuthState);

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/" element={<ClientHomePage />} />
                    : <Route path="/auth/" element={<LoginPage />} />
            }
            
            {/* Login y Register */}
            <Route path="/auth/" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Client */}
            <Route path="/" element={<ClientHomePage />} />
            <Route path="/contract/" element={<ContractCreatePage />} />
            <Route path="/user/" element={<UserHomePage />} />

            {/* Response Pay MercadoPago*/}
            <Route path="/ResponsePayment/:idPayment/:statusResponse" element={<ResponsePaymentPage />} />


            <Route path='/*' element={<Navigate to='/home/' />} />
        </Routes>
    )
}
